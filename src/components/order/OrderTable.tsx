import React from "react";
import Pagination from "../Pagination";
import { EOrderStatus, IOrder, ITable } from "../../__types__";
import { formatNumber } from "../../utils/helper.util";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utils/config.util";
import { useQuery } from "@tanstack/react-query";
import { getOrderCsv, getOrders } from "../../query";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import Loader from "../Loader";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleModal } from "../../store/common/common.slice";
import Modal from "../Modal";
import { clean } from "../../store/common.action";

type TDateRange = [Date | null, Date | null];

const HomeTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const queryParams = new URLSearchParams(search);
  const [dateRange, setDateRange] = React.useState<TDateRange>([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ]);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  const [startDate, endDate] = dateRange;

  const {
    data,
    isLoading,
    error: orderErr,
  } = useQuery({
    queryKey: ["orders", { page, limit, status }],
    queryFn: () =>
      getOrders(
        page,
        limit,
        status,
        startDate?.getTime(),
        endDate?.getTime() ||
          new Date(
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            0
          ).getTime()
      ),
    enabled: !!startDate && !!endDate,
  });
  const dataTotal =
    data && data.totalOrderStatus[queryParams.get("status") ?? "all"];

  const handleChangeStatus = (status: string) => {
    queryParams.delete("page");
    queryParams.delete("limit");
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    navigate({ search: queryParams.toString() });
  };

  // export report
  const { refetch, error: orderCsvErr } = useQuery({
    queryKey: ["ordercsv", { startDate, endDate }],
    queryFn: () => getOrderCsv(startDate?.getTime()!, endDate?.getTime()!),
    enabled: false,
  });

  // export csv modal
  const closeModal = () => dispatch(clean());
  const ModalBody = () => (
    <p className="text-sm">Xuất đơn hàng có thể mất 1 lúc để lấy dữ liệu</p>
  );
  const ModalFooter = () => (
    <>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={closeModal}
      >
        Huỷ
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={async () => {
          await refetch();
          closeModal();
        }}
      >
        Xuất Excel
      </button>
    </>
  );

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-10 mb-4 p-5">
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="inline-flex items-center gap-10">
            <button
              type="button"
              className="text-xs text-meta-5 underline"
              onClick={() => dispatch(toggleModal({ id: 0, isOpen: true }))}
            >
              Báo cáo
            </button>
            <DatePicker
              className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 cursor-pointer"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <button
            onClick={() => handleChangeStatus("all")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": !queryParams.get("status") }
            )}
          >
            <span className="m-auto">Tất cả ({data.totalOrderStatus.all})</span>
          </button>
          <button
            onClick={() => handleChangeStatus("waiting_payment")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              {
                "bg-[#FBE69E]": queryParams.get("status") === "waiting_payment",
              }
            )}
          >
            <span className="m-auto">
              Chờ thanh toán ({data.totalOrderStatus.waiting_payment})
            </span>
          </button>
          <button
            onClick={() => handleChangeStatus("pending")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "pending" }
            )}
          >
            <span className="m-auto">
              Đang xử lý ({data.totalOrderStatus.pending})
            </span>
          </button>
          <button
            onClick={() => handleChangeStatus("transported")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "transported" }
            )}
          >
            Đang vận chuyển ({data.totalOrderStatus.transported})
          </button>
          <button
            onClick={() => handleChangeStatus("success")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "success" }
            )}
          >
            <span className="m-auto">
              Đã giao hàng ({data.totalOrderStatus.success})
            </span>
          </button>
          <button
            onClick={() => handleChangeStatus("canceled")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "canceled" }
            )}
          >
            <span className="m-auto">
              {" "}
              Đã huỷ ({data.totalOrderStatus.canceled})
            </span>
          </button>
        </div>
      </div>

      <div className="rounded-sm dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  ID
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Ngày
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Tên đơn hàng
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Giá trị
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {data.orders.length > 0 &&
                data.orders.map((order: IOrder) => (
                  <tr key={order.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link to={`/order/${order.id}`} className="p-2.5 xl:p-5">
                        <p className="text-xs text-meta-5 underline truncate">
                          {order.codeOrder}
                        </p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-center">
                        {new Date(order.updateAt).toLocaleDateString("en-GB")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs truncate">{order.name}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-center">
                        {formatNumber(order.finalPrice)}
                        <span className="underline">đ</span>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={classNames("text-xs text-right", {
                          "text-primary":
                            EOrderStatus[order.status] === EOrderStatus.pending,
                          "text-warning":
                            EOrderStatus[order.status] ===
                            EOrderStatus.transported,
                          "text-success":
                            EOrderStatus[order.status] === EOrderStatus.success,
                          "text-danger":
                            EOrderStatus[order.status] ===
                            EOrderStatus.canceled,
                        })}
                      >
                        {EOrderStatus[order.status]}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {dataTotal > 0 && (
        <div className="flex justify-center items-center my-4">
          <Pagination page={page} limit={limit} total={dataTotal} />
        </div>
      )}
      {commonState.isOpenModal && (
        <Modal
          title="Xuất đơn hàng"
          body={<ModalBody />}
          footer={<ModalFooter />}
          close={closeModal}
        />
      )}
    </>
  );
};

export default HomeTable;
