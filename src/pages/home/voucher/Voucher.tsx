import React from "react";
import Loader from "../../../components/Loader";
const VoucherTable = React.lazy(
  () => import("../../../components/voucher/VoucherTable")
);

const Voucher: React.FC = () => {
  return (
    <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <React.Suspense fallback={<Loader />}>
        <VoucherTable title="Voucher" />
      </React.Suspense>
    </section>
  );
};

export default Voucher;
