import React from "react";
import { ITable, ITransaction } from "../../__types__";
import { config } from "../../utils/config.util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Pagination from "../Pagination";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleModal } from "../../store/common/common.slice";
import Modal from "../Modal";
import { formatNumber } from "../../utils/helper.util";

const TransactionTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const commonState = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status");

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
        đ {formatNumber(99999999)}
      </div>
    </div>
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
        className="inline-flex w-full justify-center rounded-md bg-[#FBE69E] text-black px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-[#FFC700] hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={() => {
          closeModal;
          navigate("/chat?uid=2");
        }}
      >
        Nhắn tin
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={closeModal}
      >
        Xác nhận
      </button>
    </>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-10">
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
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                { "bg-[#FBE69E]": !queryParams.get("status") }
              )}
            >
              Tất cả (100)
            </button>
            <button
              onClick={() => handleChangeStatus("active")}
              type="button"
              className={classNames(
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                { "bg-[#FBE69E]": queryParams.get("status") === "active" }
              )}
            >
              Chờ xử lý (10)
            </button>
            <button
              onClick={() => handleChangeStatus("inactive")}
              type="button"
              className={classNames(
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                { "bg-[#FBE69E]": queryParams.get("status") === "inactive" }
              )}
            >
              Đã xác nhận (23)
            </button>
            <button
              onClick={() => handleChangeStatus("canceled")}
              type="button"
              className={classNames(
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                { "bg-[#FBE69E]": queryParams.get("status") === "canceled" }
              )}
            >
              Đã huỷ (50)
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-8 border-stroke p-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1">
            <h5 className="text-sm text-left font-bold">ID</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-center font-bold">Ngày</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-center font-bold">Tên</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-center font-bold">Số điện thoại</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-center font-bold">Nội dung</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-center font-bold">Số tiền</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm text-center font-bold">Trạng thái</h5>
          </div>
          <div className="col-span-1 text-center">
            <h5 className="text-sm text-center font-bold">Hành động</h5>
          </div>
        </div>

        {/* demo */}
        <div className="grid grid-cols-8 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <Link to={`/transaction/1`} className="col-span-1 items-center">
            <p className="text-xs text-center text-black dark:text-white">#1</p>
          </Link>

          <div className="col-span-1 items-center">
            <p className="text-xs font-semibold text-center text-black dark:text-white text-ellipsis overflow-hidden">
              11
            </p>
          </div>

          <div className="col-span-1 items-center">
            <p className="text-xs text-center text-black dark:text-white">ss</p>
          </div>

          <div className="col-span-1 items-center">
            <p className="text-xs text-center text-black dark:text-white">df</p>
          </div>
          <div className="col-span-1 items-center">
            <p className="text-xs text-center text-black dark:text-white">df</p>
          </div>
          <div className="col-span-1 items-center">
            <p className="text-xs text-center text-black dark:text-white">df</p>
          </div>
          <div className="col-span-1 items-center">
            <p className="text-xs text-center text-black dark:text-white">df</p>
          </div>
          <div className="col-span-1 flex justify-center">
            <button type="button" onClick={() => dispatch(toggleModal(true))}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke="#7C7C7C"
                  strokeWidth="2"
                />
                <path
                  d="M8.41005 7.38995C7.86332 6.84321 7.86332 5.95679 8.41005 5.41005C8.95679 4.86332 9.84321 4.86332 10.3899 5.41005L15.99 11.0101C16.5367 11.5568 16.5367 12.4432 15.99 12.99L10.3899 18.5899C9.84321 19.1367 8.95679 19.1367 8.41005 18.5899C7.86332 18.0432 7.86332 17.1568 8.41005 16.6101L13.0201 12L8.41005 7.38995Z"
                  fill="#7C7C7C"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* {data.products.length > 0 &&
          data.products.map((product: ITransaction) => (
            <div
              key={product.id}
              className="grid grid-cols-7 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
            >
              <Link
                to={`/transaction/${product.slug}`}
                className="col-span-1 hidden items-center sm:flex"
              >
                <p className="text-xs text-black dark:text-white">
                  #{product.id}
                </p>
              </Link>

              <Link
                to={`/transaction/${product.slug}`}
                className="col-span-4 flex items-center gap-1"
              >
                <div className="w-20 rounded-md">
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

              <div className="col-span-1 flex flex-col items-start justify-center gap-1">
                <p className="text-sm text-black dark:text-white">
                  <span className="underline">đ</span>
                  <span>
                    {minPrice && formatNumber(minPrice)} -{" "}
                    {maxPrice && formatNumber(maxPrice)}
                  </span>
                </p>
              </div>

              <div className="col-span-1 hidden sm:flex flex-col items-start justify-center gap-1">
                <p className="text-xs text-meta-5">
                  {EProductStatus[product.status]}
                </p>
                <p className="text-xs text-meta-5">Tồn : {inventory}</p>
              </div>
            </div>
          ))}

        {data.products.length > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={dataTotal} />
          </div>
        )} */}

        {commonState.isOpenModal && (
          <Modal
            title="Xác nhận giao dịch"
            body={<ModalBody />}
            footer={<ModalFooter />}
            close={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default TransactionTable;
