import React from "react";
import Loader from "../../../components/Loader";
const ProductTable = React.lazy(
  () => import("../../../components/product/ProductTable")
);

const Product: React.FC = () => {
  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <React.Suspense fallback={<Loader />}>
        <ProductTable title="Sản phẩm" />
      </React.Suspense>
    </section>
  );
};

export default Product;
