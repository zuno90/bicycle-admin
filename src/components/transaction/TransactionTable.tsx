import React from "react";
import Pagination from "../Pagination";
import Modal from "../Modal";
import {
  ENotificationType,
  ETransaction,
  ITable,
  ITransaction,
} from "../../__types__";
import { config } from "../../utils/config.util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleModal } from "../../store/common/common.slice";
import { formatNumber, notify } from "../../utils/helper.util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../../query/transaction.query";
import Loader from "../Loader";
import { updateTransactionByStatus } from "../../mutation";
import { clean } from "../../store/common.action";

const TransactionTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // user id inside modal
  const [uid, setUid] = React.useState<number>(0);

  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  // update status
  const {
    mutate: updateStatusMutate,
    isLoading: updateTransactionByStatusLoading,
  } = useMutation(updateTransactionByStatus, {
    onSuccess: (res) => {
      if (!res.success)
        notify(
          ENotificationType.error,
          "Xảy ra lỗi! Không thể xác nhận giao dịch!"
        );
      else {
        dispatch(clean());
        queryClient.invalidateQueries({
          queryKey: ["transactions", { page, limit, status }],
        });
        notify(ENotificationType.success, "Xác nhận giao dịch thành công!");
      }
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", { page, limit, status }],
    queryFn: () => getTransactions(page, limit, status),
  });

  const dataTotal =
    data && data.totalStatusPayment[queryParams.get("status") ?? "all"];

  const handleChangeStatus = (status: string) => {
    queryParams.delete("page");
    queryParams.delete("limit");
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    navigate({ search: queryParams.toString() });
  };

  // modal
  const closeModal = () => dispatch(toggleModal(false));
  const ModalBody = () => (
    <div className="flex flex-col gap-4">
      <p>Vui lòng xác nhận số tiền nhận được tại đây</p>
      <div className="py-8 bg-gray text-2xl font-semibold rounded-lg">
        {formatNumber(
          data &&
            data.payments?.filter(
              (p: ITransaction) => p.id === commonState.modalId
            )[0].amount
        )}
        đ
      </div>
    </div>
  );
  const ModalFooter = () => (
    <>
      <button
        type="button"
        disabled={updateTransactionByStatusLoading}
        className="inline-flex w-full justify-center rounded-md bg-[#DDDDDD] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#B6B6B6] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={() => {
          closeModal();
          updateStatusMutate({
            id: commonState.modalId,
            statusPayment: "canceled",
          });
        }}
      >
        Huỷ giao dịch
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-[#FBE69E] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#FFC700] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={() => {
          closeModal();
          navigate(`/chat?uid=${uid}`);
        }}
      >
        Nhắn tin
      </button>
      <button
        type="button"
        disabled={updateTransactionByStatusLoading}
        className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={() => {
          closeModal();
          updateStatusMutate({
            id: commonState.modalId,
            statusPayment: "success",
          });
        }}
      >
        Xác nhận
      </button>
    </>
  );

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-10 mb-4">
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
        <div className="inline-flex items-center gap-4">
          <button
            onClick={() => handleChangeStatus("all")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": !queryParams.get("status") }
            )}
          >
            Tất cả ({data.totalStatusPayment.all})
          </button>
          <button
            onClick={() => handleChangeStatus("pending")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "pending" }
            )}
          >
            Chờ xử lý ({data.totalStatusPayment.pending})
          </button>
          <button
            onClick={() => handleChangeStatus("success")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "success" }
            )}
          >
            Đã xác nhận ({data.totalStatusPayment.success})
          </button>
          <button
            onClick={() => handleChangeStatus("canceled")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "canceled" }
            )}
          >
            Đã huỷ ({data.totalStatusPayment.canceled})
          </button>
        </div>
      </div>

      <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                  Tên
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Số điện thoại
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Nội dung
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Số tiền
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Trạng thái
                </th>
                <th className="py-4 pl-4 font-medium text-black dark:text-white">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody>
              {data.payments.length > 0 &&
                data.payments.map((transaction: ITransaction) => (
                  <tr key={transaction.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link to={`/transaction/${transaction.id}`}>
                        <p className="text-xs text-black dark:text-white">
                          {transaction.paymentCode}
                        </p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                        {new Date(transaction.createAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white">
                        {transaction.user.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white">
                        {transaction.user.phoneNumber}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white">
                        {transaction.content}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-center text-black dark:text-white">
                        {formatNumber(transaction.amount)}đ
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={classNames(
                          "text-xs text-center text-black dark:text-white",
                          {
                            "text-meta-1": transaction.status === "pending",
                            "text-success": transaction.status === "success",
                            "text-warning": transaction.status === "canceled",
                          }
                        )}
                      >
                        {ETransaction[transaction.status]}
                      </p>
                    </td>

                    {transaction.status === "pending" && (
                      <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark">
                        <div className="flex justify-center items-center">
                          <button
                            type="button"
                            onClick={() => {
                              setUid(transaction.userId);
                              dispatch(
                                toggleModal({
                                  id: transaction.id,
                                  isOpen: true,
                                })
                              );
                            }}
                          >
                            <svg
                              className="fill-current"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M8.6,16.6L13.2,12L8.6,7.4L10,6L16,12L10,18L8.6,16.6Z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    )}
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
          title="Xác nhận giao dịch"
          body={<ModalBody />}
          footer={<ModalFooter />}
          close={closeModal}
        />
      )}
    </>
  );
};

export default TransactionTable;
