import React from "react";
import Pagination from "../Pagination";
import Loader from "../Loader";
import { formatNumber } from "../../utils/helper.util";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../query";
import { config } from "../../utils/config.util";
import {
  EProductStatus,
  IProduct,
  IProductItem,
  ITable,
} from "../../__types__";
import classNames from "classnames";

const ProductTable: React.FC<ITable> = ({ title }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
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

  console.log(data);

  const dataTotal =
    data && data.totalStatusProduct[queryParams.get("status") ?? "all"];

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

        <div className="flex items-center gap-4">
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
      <div className="flex flex-col">
        <div className="grid grid-cols-7 border-stroke py-4 dark:border-strokedark sm:grid-cols-7">
          <div className="col-span-1r">
            <h5 className="text-sm font-bold xsm:text-base">Mã</h5>
          </div>
          <div className="col-span-4">
            <h5 className="text-sm font-bold xsm:text-base">Sản phẩm</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm font-bold xsm:text-base">Giá</h5>
          </div>
          <div className="col-span-1">
            <h5 className="text-sm font-bold text-right xsm:text-base">
              Trạng thái
            </h5>
          </div>
        </div>

        {data.products.length > 0 &&
          data.products.map((product: IProduct) => (
            <div
              key={product.id}
              className="grid grid-cols-7 border-t border-stroke py-4 dark:border-strokedark sm:grid-cols-7"
            >
              <Link
                to={`/product/${product.id}`}
                className="col-span-1 flex items-center"
              >
                <p className="text-xs text-left text-black dark:text-white">
                  #{product.id}
                </p>
              </Link>

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

              <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                <p className="text-xs text-black dark:text-white">
                  <span className="underline">đ</span>
                  <span>
                    {formatNumber(
                      Math.min(
                        ...product.productItem.map((j: IProductItem) => j.price)
                      )
                    )}
                    {" - "}
                    {formatNumber(
                      Math.max(
                        ...product.productItem.map((j: IProductItem) => j.price)
                      )
                    )}
                  </span>
                </p>
              </div>

              <div className="col-span-1 flex flex-col items-end justify-center gap-2">
                <p className="text-xs text-black dark:text-white">
                  {EProductStatus[product.status]}
                </p>
                <p className="text-xs text-black dark:text-white">
                  Tồn :{" "}
                  {product.productItem
                    .map((j: IProductItem) => j.inventory)
                    .reduce((a, b) => a + b)}
                </p>
              </div>
            </div>
          ))}

        {dataTotal > 0 && (
          <div className="flex justify-center items-center my-4">
            <Pagination page={page} limit={limit} total={dataTotal} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductTable;
