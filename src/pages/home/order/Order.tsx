import React from "react";
import Card from "../../../components/order/Card";
import Loader from "../../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "../../../query";
const OrderTable = React.lazy(
  () => import("../../../components/order/OrderTable")
);

const Order: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["report"],
    queryFn: () => getReports(),
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-6">
        <Card title="Doanh thu" data={data.revenue} />
        <Card title="Khách hàng" data={data.customer} />
        <Card title="Đơn hàng" data={data.order} />
      </section>
      <section
        className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
      >
        <React.Suspense fallback={<Loader />}>
          <OrderTable title="Đơn hàng" />
        </React.Suspense>
      </section>
    </>
  );
};

export default Order;
