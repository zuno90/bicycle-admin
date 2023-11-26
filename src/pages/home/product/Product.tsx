import React from "react";
import Loader from "../../../components/Loader";
const ProductTable = React.lazy(
  () => import("../../../components/product/ProductTable")
);

const Product: React.FC = () => {
  return (
    <section
      className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
    >
      <React.Suspense fallback={<Loader />}>
        <ProductTable title="Sản phẩm" />
      </React.Suspense>
    </section>
  );
};

export default Product;
