import React from "react";
import BrandOne from "../assets/images/brand/brand-01.svg";

import { IProductTable } from "../__types__";

type TTable = {
  title: string;
  data: IProductTable;
};

const Table: React.FC<TTable> = ({ title, data }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
        <div className="flex items-center gap-4">
          <p className="text-meta-5 underline">Xuất đơn hàng</p>
          <p className="text-meta-5 underline">Xuất đơn hàng</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">Ngày</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">Tên đơn hàng</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">Giá trị</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">Trạng thái</h5>
          </div>
          <div className="hidden p-2.5 text-right sm:block xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">Hành động</h5>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <img src={BrandOne} alt="Brand" />
            </div>
            <p className="hidden text-black dark:text-white sm:block">Google</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">3.5K</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">$5,768</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-black dark:text-white">590</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">4.8%</p>
          </div>

          <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
            <p className="text-meta-5">4.8%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
