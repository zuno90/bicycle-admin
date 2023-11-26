import React from "react";
import Loader from "../../../components/Loader";
const TransactionTable = React.lazy(
  () => import("../../../components/transaction/TransactionTable")
);

const Transaction: React.FC = () => {
  return (
    <section
      className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
    >
      <React.Suspense fallback={<Loader />}>
        <TransactionTable title="Giao dịch" />
      </React.Suspense>
    </section>
  );
};

export default Transaction;
