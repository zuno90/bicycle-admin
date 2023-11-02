import React from "react";
import Loader from "../Loader";
import Switcher from "../Switcher";
import Pagination from "../Pagination";
import Modal from "../Modal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ENotificationType,
  EVoucherStatus,
  ITable,
  IVoucher,
} from "../../__types__";
import { formatNumber, notify } from "../../utils/helper.util";
import { config } from "../../utils/config.util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVouchers } from "../../query";
import classNames from "classnames";
import {
  deleteVoucher,
  updateVoucherByStatus,
} from "../../mutation/voucher.mutation";
import { useAppDispatch, useAppSelector } from "../../store";
import { clean } from "../../store/common.action";
import { toggleModal } from "../../store/common/common.slice";

const VoucherTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  const queryParams = new URLSearchParams(search);
  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  // update status
  const {
    mutate: updateStatusMutate,
    isLoading: updateVoucherByStatusLoading,
  } = useMutation(updateVoucherByStatus, {
    onSuccess: (res) => {
      if (!res.success)
        notify(
          ENotificationType.error,
          "Xảy ra lỗi! Không thể cập nhật trạng thái voucher!"
        );
      else {
        queryClient.invalidateQueries({
          queryKey: ["vouchers", { page, limit, status }],
        });
        notify(
          ENotificationType.success,
          "Cập nhật trạng thái voucher thành công!"
        );
      }
    },
  });

  // delete
  const { mutate: deleteMutate, isLoading: deleteVoucherLoading } = useMutation(
    deleteVoucher,
    {
      onSuccess: (res) => {
        if (!res.success)
          notify(ENotificationType.error, "Xảy ra lỗi! Không thể xoá voucher!");
        else {
          queryClient.invalidateQueries({
            queryKey: ["vouchers", { page, limit, status }],
          });
          notify(ENotificationType.success, "Xoá voucher thành công!");
        }
      },
    }
  );

  const { data, isLoading } = useQuery({
    queryKey: ["vouchers", { page, limit, status }],
    queryFn: () => getVouchers(page, limit, status),
  });

  const dataTotal =
    data && data.totalVoucherStatus[queryParams.get("status") ?? "all"];

  const handleChangeStatus = (status: string) => {
    queryParams.delete("page");
    queryParams.delete("limit");
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    navigate({ search: queryParams.toString() });
  };

  // delete modal
  const closeModal = () => dispatch(toggleModal(false));
  const ModalBody = () => <p>Bạn muốn xoá voucher này?</p>;
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
        onClick={() => {
          deleteMutate(commonState.modalId);
          closeModal();
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
        <div className="w-full inline-flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              className="text-xs text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
              onClick={() => navigate("/voucher/create")}
            >
              Tạo mã khuyến mãi
              <svg
                className="w-4 h-4 ml-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleChangeStatus("all")}
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": !queryParams.get("status") }
            )}
          >
            Tất cả ({data.totalVoucherStatus.all})
          </button>
          <button
            onClick={() => handleChangeStatus("upcoming")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "upcoming" }
            )}
          >
            Sắp diễn ra ({data.totalVoucherStatus.upcoming})
          </button>
          <button
            onClick={() => handleChangeStatus("ongoing")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "ongoing" }
            )}
          >
            Đang hoạt động ({data.totalVoucherStatus.ongoing})
          </button>
          <button
            onClick={() => handleChangeStatus("inactive")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "inactive" }
            )}
          >
            Ngừng hoạt động ({data.totalVoucherStatus.inactive})
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 border-stroke py-4 dark:border-strokedark sm:grid-cols-8">
          <div className="col-span-1 flex items-center"></div>
          <div className="col-span-1 flex items-center">
            <h5 className="text-sm font-bold xsm:text-base">Mã</h5>
          </div>
          <div className="col-span-2 flex items-center">
            <h5 className="text-sm font-bold xsm:text-base">Tên khuyến mãi</h5>
          </div>
          <div className="col-span-1flex items-center">
            <h5 className="text-sm font-bold xsm:text-base">Giảm giá</h5>
          </div>
          <div className="col-span-1 flex items-center">
            <h5 className="text-sm font-bold xsm:text-base">Thời gian</h5>
          </div>
          <div className="col-span-1flex items-center">
            <h5 className="text-sm font-bold xsm:text-base">Trạng thái</h5>
          </div>

          <div className="col-span-1 flex justify-end text-end">
            <h5 className="text-sm font-bold xsm:text-base">Hành động</h5>
          </div>
        </div>

        {data.vouchers.length > 0 &&
          data.vouchers.map((voucher: IVoucher) => (
            <div
              key={voucher.id}
              className="grid grid-cols-6 border-t border-stroke py-4 dark:border-strokedark sm:grid-cols-8"
            >
              <div className="col-span-1 flex items-center">
                <Switcher
                  id={voucher.id}
                  isEnabled={voucher.statusDisplay}
                  action={() => updateStatusMutate(voucher.id)}
                />
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  #{voucher.code}
                </p>
              </div>

              <div className="col-span-2 flex items-center">
                <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                  {voucher.title}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  <span className="underline">đ</span>
                  <span>{formatNumber(voucher.value)}</span>
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  12/09/23 - 30/09/23
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  {EVoucherStatus[voucher.status]}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 flex justify-center text-end">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(toggleModal({ id: voucher.id, isOpen: true }))
                  }
                  className="hover:text-primary"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                      fill=""
                    />
                    <path
                      d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                      fill=""
                    />
                    <path
                      d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                      fill=""
                    />
                    <path
                      d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

        {data.vouchers.length > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={dataTotal} />
          </div>
        )}

        {commonState.isOpenModal && (
          <Modal
            title="Xoá voucher"
            body={<ModalBody />}
            footer={<ModalFooter />}
            close={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default VoucherTable;
