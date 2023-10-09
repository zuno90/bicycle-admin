import React from "react";
import ProductTable from "../../components/ProductTable";

const Product: React.FC = () => {
  return (
    <>
      <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <ProductTable title="Sản phẩm" data={1} />
      </section>
    </>
  );
};

export default Product;
