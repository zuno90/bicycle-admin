import React from "react";
import Loader from "../../../components/Loader";

const SubCategoryTable = React.lazy(
  () => import("../../../components/category/SubCategoryTable")
);

const CategoryDetail: React.FC = () => {
  return (
    <section
      className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
    >
      <React.Suspense fallback={<Loader />}>
        <SubCategoryTable title="Danh mục" />
      </React.Suspense>
    </section>
  );
};

export default CategoryDetail;
