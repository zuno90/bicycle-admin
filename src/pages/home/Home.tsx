import React from "react";
import Card from "../../components/Card";
import HomeTable from "../../components/HomeTable";

const Home: React.FC = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-6">
        <Card />
        <Card />
        <Card />
      </section>
      <section className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <HomeTable title="Đơn hàng" data={1} />
      </section>
    </>
  );
};

export default Home;
