import React from "react";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { formatNumber, mergeSort, mergeTotal } from "../../utils/helper.util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../query";
import { config } from "../../utils/config.util";
import { EProductStatus, ITable } from "../../__types__";
import classNames from "classnames";

const ProductTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);

  const page = Number(queryParams.get("page")) || config.pagination.PAGE;
  const limit = Number(queryParams.get("limit")) || config.pagination.LIMIT;
  const status = queryParams.get("status") || undefined;

  const handleChangeStatus = (status: string) => {
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    navigate({ search: queryParams.toString() });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", { page, limit, status }],
    queryFn: () => getProducts(page, limit, status),
  });

  let minPrice: number;
  let maxPrice: number;
  let inventory: number;
  if (data) {
    const priceArr = data.products.map((i) =>
      i.productItem.map((j) => j.price)
    );
    console.log(priceArr);
    const inventoryArr = data.products.map((i) =>
      i.productItem.map((j) => j.inventory)
    );
    const { min, max } = mergeSort(priceArr);
    minPrice = min;
    maxPrice = max;
    inventory = mergeTotal(inventoryArr);
  }

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
              onClick={() => handleChangeStatus("all")}
              type="button"
              className={classNames(
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                { "bg-[#FBE69E]": !queryParams.get("status") }
              )}
            >
              Tất cả ({data.totalProductStatus.all})
            </button>
            <button
              onClick={() => handleChangeStatus("active")}
              type="button"
              className={classNames(
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                {
                  "bg-[#FBE69E]": queryParams.get("status") === "active",
                }
              )}
            >
              Đang hoạt động ({data.totalProductStatus.active})
            </button>
            <button
              onClick={() => handleChangeStatus("inactive")}
              type="button"
              className={classNames(
                "text-black bg-[#F3F3F3] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2",
                {
                  "bg-[#FBE69E]": queryParams.get("status") === "inactive",
                }
              )}
            >
              Đang ẩn ({data.totalProductStatus.inactive})
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className="text-black bg-[#FBE69E] hover:bg-[#FFC700]/90 focus:ring-2 focus:outline-none focus:ring-[#FFC700]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
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
      <div className="flex flex-col">
        <div className="grid grid-cols-7 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Mã</h5>
          </div>
          <div className="col-span-4 flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Sản phẩm</h5>
          </div>
          <div className="col-span-1 flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Giá</h5>
          </div>
          <div className="col-span-1 hidden sm:flex items-center">
            <h5 className="text-sm font-medium xsm:text-base">Trạng thái</h5>
          </div>
        </div>

        {data.products.length > 0 &&
          data.products.map((product: any) => (
            <div
              key={product.id}
              className="grid grid-cols-7 border-t border-stroke p-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
            >
              <Link
                to={`/product/${product.slug}`}
                className="col-span-1 hidden items-center sm:flex"
              >
                <p className="text-xs text-black dark:text-white">
                  #{product.id}
                </p>
              </Link>

              <Link
                to={`/product/${product.slug}`}
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
            <Pagination
              page={page}
              limit={limit}
              total={data.totalProductStatus.all}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductTable;
