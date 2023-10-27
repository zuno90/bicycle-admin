import React from "react";
import Pagination from "../Pagination";
import Switcher from "../Switcher";
import Loader from "../Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { ITable, IVoucher } from "../../__types__";
import { formatNumber } from "../../utils/helper.util";
import { config } from "../../utils/config.util";
import { useQuery } from "@tanstack/react-query";
import { getVouchers } from "../../query";

const VoucherTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;

  const { data, isLoading, error } = useQuery({
    queryKey: ["vouchers", { page, limit }],
    queryFn: () => getVouchers(page, config.pagination.LIMIT),
  });

  console.log(data, 66);

  const handleChangeStatus = async () => {};

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              Tất cả (100)
            </button>
            <button
              type="button"
              className="text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              Sắp diễn ra (10)
            </button>
            <button
              type="button"
              className="text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              Đang hoạt động (23)
            </button>
            <button
              type="button"
              className="text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              Ngừng hoạt động (50)
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
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
      <div className="flex flex-col">
        <div className="grid grid-cols-6 border-stroke p-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center"></div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Mã</h5>
          </div>
          <div className="col-span-2 flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">
              Tên khuyến mãi
            </h5>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Giảm giá</h5>
          </div>
          <div className="col-span-1 flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Thời gian</h5>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Trạng thái</h5>
          </div>

          <div className="col-span-2 sm:col-span-1 flex justify-end text-end">
            <h5 className="text-sm font-medium xsm:text-base">Hành động</h5>
          </div>
        </div>

        {data.length > 0 &&
          data.map((voucher: IVoucher) => (
            <div
              key={voucher.id}
              className="grid grid-cols-6 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-1 flex items-center">
                <Switcher id={voucher.id} isEnabled={voucher.status} />
              </div>
              <div className="col-span-1 hidden sm:flex items-center">
                <p className="text-xs text-black dark:text-white">
                  #{voucher.code}
                </p>
              </div>

              <div className="col-span-2 flex items-center">
                <p className="text-xs font-semibold text-black dark:text-white text-ellipsis overflow-hidden">
                  {voucher.title}
                </p>
              </div>

              <div className="col-span-1 hidden sm:flex items-center">
                <p className="text-xs text-black dark:text-white">
                  <span className="underline">đ</span>
                  <span>
                    {voucher.unit === "%"
                      ? formatNumber(
                          (1 - voucher.value / 100) * voucher.fromPrice
                        )
                      : voucher.value}
                  </span>
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  12/09/23 - 30/09/23
                </p>
              </div>

              <div className="col-span-1 hidden sm:flex items-center">
                <p className="text-xs text-meta-5">Sắp diễn ra</p>
              </div>

              <div className="col-span-2 sm:col-span-1 flex justify-end text-end">
                <div className="flex items-center justify-center gap-4">
                  <button className="hover:text-primary">
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
                  <button className="hover:text-primary">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4.99998H6C5.46957 4.99998 4.96086 5.21069 4.58579 5.58577C4.21071 5.96084 4 6.46955 4 6.99998V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V13M17.586 3.58598C17.7705 3.39496 17.9912 3.24259 18.2352 3.13778C18.4792 3.03296 18.7416 2.97779 19.0072 2.97548C19.2728 2.97317 19.5361 3.02377 19.7819 3.12434C20.0277 3.2249 20.251 3.3734 20.4388 3.56119C20.6266 3.74897 20.7751 3.97228 20.8756 4.21807C20.9762 4.46386 21.0268 4.72722 21.0245 4.99278C21.0222 5.25834 20.967 5.52078 20.8622 5.76479C20.7574 6.0088 20.605 6.22949 20.414 6.41398L11.828 15H9V12.172L17.586 3.58598Z"
                        stroke="#7C7C7C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="hover:text-primary">
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
            </div>
          ))}

        {data.length > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={31} />
          </div>
        )}
      </div>
    </>
  );
};

export default VoucherTable;