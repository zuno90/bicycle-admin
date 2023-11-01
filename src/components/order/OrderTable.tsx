import React from "react";
import Pagination from "../Pagination";
import { EOrderStatus, IOrder, ITable } from "../../__types__";
import { formatNumber } from "../../utils/helper.util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utils/config.util";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../query";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import Loader from "../Loader";

type TDateRange = [Date | null, Date | null];

const HomeTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  const [dateRange, setDateRange] = React.useState<TDateRange>([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ]);
  const [startDate, endDate] = dateRange;

  const { data, isLoading } = useQuery({
    queryKey: ["orders", { page, limit, status }],
    queryFn: () => getOrders(page, limit, status),
  });
  const dataTotal =
    data && data.totalOrderStatus[queryParams.get("status") ?? "all"];

  console.log(data);

  const handleChangeStatus = (status: string) => {
    queryParams.delete("page");
    queryParams.delete("limit");
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    navigate({ search: queryParams.toString() });
  };

  const handleExportOrder = () => {};

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-10 mb-4">
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              className="text-xs underline"
              onClick={handleExportOrder}
            >
              Xuất đơn hàng
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

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleChangeStatus("all")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
              { "bg-[#FBE69E]": !queryParams.get("status") }
            )}
          >
            Tất cả ({data.totalOrderStatus.all})
          </button>
          <button
            onClick={() => handleChangeStatus("pending")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
              {
                "bg-[#FBE69E]": queryParams.get("status") === "pending",
              }
            )}
          >
            Đang xử lý ({data.totalOrderStatus.pending})
          </button>
          <button
            onClick={() => handleChangeStatus("transported")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
              {
                "bg-[#FBE69E]": queryParams.get("status") === "transported",
              }
            )}
          >
            Đang vận chuyển ({data.totalOrderStatus.transported})
          </button>
          <button
            onClick={() => handleChangeStatus("success")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
              {
                "bg-[#FBE69E]": queryParams.get("status") === "success",
              }
            )}
          >
            Đã giao hàng ({data.totalOrderStatus.success})
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm dark:bg-meta-4 sm:grid-cols-5 border-b border-stroke">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-bold xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-bold xsm:text-base">Ngày</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-bold xsm:text-base">Tên đơn hàng</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-bold xsm:text-base">Giá trị</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm text-right font-bold xsm:text-base">Trạng thái</h5>
          </div>
        </div>

        {data.orders.length > 0 &&
          data.orders.map((order: IOrder) => (
            <div
              key={order.id}
              className="grid grid-cols-3 border-stroke py-2 dark:border-strokedark sm:grid-cols-5"
            >
              <Link
                to={`/order/${order.id}`}
                className="hidden sm:flex items-center gap-3 p-2.5 xl:p-5"
              >
                <p className="text-xs underline">{order.orderCode}</p>
              </Link>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-xs">01/09/2023</p>
              </div>

              <div className="flex items-center p-2.5 xl:p-5">
                <p className="text-xs">{order.orderLines[0].id}</p>
              </div>

              <div className="items-center p-2.5 sm:flex xl:p-5">
                <p className="text-xs">
                  <span className="underline">đ</span>
                  {formatNumber(order.totalPrice)}
                </p>
              </div>

              <div className="p-2.5 xl:p-5">
                <p className="text-xs text-right">{EOrderStatus[order.status]}</p>
              </div>
            </div>
          ))}

        {data.orders.length > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={dataTotal} />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeTable;
