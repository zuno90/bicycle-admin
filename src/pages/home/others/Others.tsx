import React from "react";
import Loader from "../../../components/Loader";
import Banner from "../../../components/others/Banner";

const Others = () => (
  <section
    className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
  >
    <React.Suspense fallback={<Loader />}>
      <Banner />
    </React.Suspense>
  </section>
);

export default Others;
