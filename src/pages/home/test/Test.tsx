import React from "react";
import Loader from "../../../components/Loader";
const OrderInvoice = React.lazy(() => import("../order/OrderInvoice"));

const Test: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <OrderInvoice data={null} />
    </React.Suspense>
  );
};

export default Test;
