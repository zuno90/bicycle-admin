import React from "react";
import Loader from "../../../components/Loader";
const UserTable = React.lazy(
  () => import("../../../components/user/UserTable")
);

const User: React.FC = () => {
  return (
    <section
      className="rounded-sm  bg-white
 border border-stroke dark:border-strokedark dark:bg-boxdark"
    >
      <React.Suspense fallback={<Loader />}>
        <UserTable title="Quản lý người dùng" />
      </React.Suspense>
    </section>
  );
};

export default User;
