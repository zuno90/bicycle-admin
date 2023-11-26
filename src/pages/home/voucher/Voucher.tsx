import React from "react";
import Loader from "../../../components/Loader";
const VoucherTable = React.lazy(
  () => import("../../../components/voucher/VoucherTable")
);

const Voucher: React.FC = () => {
  return (
    <section
      className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
    >
      <React.Suspense fallback={<Loader />}>
        <VoucherTable title="Voucher" />
      </React.Suspense>
    </section>
  );
};

export default Voucher;
