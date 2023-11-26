import React from "react";
import Loader from "../../../components/Loader";
const CategoryTable = React.lazy(
  () => import("../../../components/category/CategoryTable")
);

const Category: React.FC = () => {
  return (
    <section
      className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
    >
      <React.Suspense fallback={<Loader />}>
        <CategoryTable title="Danh mục" />
      </React.Suspense>
    </section>
  );
};

export default Category;
