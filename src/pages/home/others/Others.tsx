import React from "react";
import Loader from "../../../components/Loader";
import Banner from "../../../components/others/Banner";

const Others = () => (
  <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <React.Suspense fallback={<Loader />}>
      <Banner />
    </React.Suspense>
  </section>
);

export default Others;
