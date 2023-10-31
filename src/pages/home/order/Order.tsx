import React from "react";
import Card from "../../../components/order/Card";
import Loader from "../../../components/Loader";
const OrderTable = React.lazy(
  () => import("../../../components/order/OrderTable")
);

const Order: React.FC = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-6">
        <Card title="Doanh thu" />
        <Card title="Khách hàng" />
        <Card title="Đơn hàng" />
      </section>
      <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <React.Suspense fallback={<Loader />}>
          <OrderTable title="Đơn hàng" />
        </React.Suspense>
      </section>
    </>
  );
};

export default Order;
