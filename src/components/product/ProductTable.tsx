import React from "react";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { formatNumber, notify } from "../../utils/helper.util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../query";
import { config } from "../../utils/config.util";
import {
  ENotificationType,
  EProductStatus,
  IProduct,
  IProductItem,
  ITable,
} from "../../__types__";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeProduct, updateProductByStatus } from "../../mutation";
import { clean } from "../../store/common.action";
import Modal from "../Modal";
import { toggleModal } from "../../store/common/common.slice";
import Switcher from "../Switcher";

const ProductTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { page, limit, status }],
    queryFn: () => getProducts(page, limit, status),
  });

  const handleChangeStatus = (status: string) => {
    queryParams.delete("page");
    queryParams.delete("limit");
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    navigate({ search: queryParams.toString() });
  };
  const dataTotal =
    data && data.totalStatusProduct[queryParams.get("status") ?? "all"];

  // delete
  const { mutate } = useMutation(removeProduct, {
    onSuccess: (res) => {
      if (!res.success)
        notify(ENotificationType.error, "Xảy ra lỗi! Không thể xoá sản phẩm!");
      else {
        queryClient.invalidateQueries({
          queryKey: ["products", { page, limit, status }],
        });
        notify(ENotificationType.success, "Xoá sản phẩm thành công!");
      }
    },
  });

  // update status
  const { mutate: updateStatusMutate } = useMutation(updateProductByStatus, {
    onSuccess: (res) => {
      if (!res.success)
        notify(
          ENotificationType.error,
          "Xảy ra lỗi! Không thể cập nhật trạng thái sản phẩm!"
        );
      else {
        queryClient.invalidateQueries({
          queryKey: ["products", { page, limit, status }],
        });
        dispatch(clean());
        notify(
          ENotificationType.success,
          "Cập nhật trạng thái sản phẩm thành công!"
        );
      }
    },
  });

  // delete modal
  const closeModal = () => dispatch(clean());
  const ModalBody = () => <p>Bạn muốn xoá sản phẩm này?</p>;
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
          mutate(commonState.modalId);
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
        <div className="w-full inline-flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
              onClick={() => navigate("/product/create")}
            >
              Thêm sản phẩm
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

        <div className="w-full flex items-center gap-4">
          <button
            onClick={() => handleChangeStatus("all")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": !queryParams.get("status") }
            )}
          >
            Tất cả ({data.totalStatusProduct.all})
          </button>
          <button
            onClick={() => handleChangeStatus("active")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "active" }
            )}
          >
            Đang hoạt động ({data.totalStatusProduct.active})
          </button>
          <button
            onClick={() => handleChangeStatus("inactive")}
            type="button"
            className={classNames(
              "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55",
              { "bg-[#FBE69E]": queryParams.get("status") === "inactive" }
            )}
          >
            Đang ẩn ({data.totalStatusProduct.inactive})
          </button>
        </div>
      </div>

      <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white"></th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Mã
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Sản phẩm
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Giá
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
              {data.products.length > 0 &&
                data.products.map((product: IProduct) => (
                  <tr key={product.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Switcher
                        id={product.id}
                        isEnabled={product.statusDisplay}
                        action={() => updateStatusMutate(product.id)}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link
                        to={`/product/${product.id}`}
                        className="col-span-1 flex items-center"
                      >
                        <p className="text-xs text-left text-black dark:text-white">
                          #{product.id}
                        </p>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Link
                        to={`/product/${product.id}`}
                        className="col-span-4 flex items-center gap-2"
                      >
                        <div className="w-14 rounded-md">
                          <img
                            className="rounded-lg"
                            src={product.images[0]}
                            alt="Product"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                            {product.name}
                          </p>
                          <p className="text-xs font-thin text-black dark:text-white text-ellipsis overflow-hidden">
                            Lượt bán: {product.sold}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white">
                        <span>
                          {formatNumber(
                            Math.min(
                              ...product.productItem.map(
                                (j: IProductItem) => j.price
                              )
                            )
                          )}
                          {" - "}
                          {formatNumber(
                            Math.max(
                              ...product.productItem.map(
                                (j: IProductItem) => j.price
                              )
                            )
                          )}
                          <span className="underline">đ</span>
                        </span>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-xs text-black dark:text-white">
                        {EProductStatus[product.status]}
                      </p>
                      <p className="text-xs text-black dark:text-white">
                        Tồn :{" "}
                        {product.productItem
                          .map((j: IProductItem) => j.inventory)
                          .reduce((a, b) => a + b)}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark">
                      <div className="flex justify-center items-center">
                        <button
                          type="button"
                          className="hover:text-primary"
                          onClick={() =>
                            dispatch(
                              toggleModal({ id: product.id, isOpen: true })
                            )
                          }
                        >
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
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
          title="Xoá sản phẩm"
          body={<ModalBody />}
          footer={<ModalFooter />}
          close={closeModal}
        />
      )}
    </>
  );
};

export default ProductTable;
