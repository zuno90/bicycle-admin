import React from "react";
import { Layout as AntdLayout } from "antd";
const Sidebar = React.lazy(() => import("./Sidebar"));
const Main = React.lazy(() => import("./Main"));

const Layout: React.FC = () => {
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <React.Suspense>
        <Sidebar />
        <Main />
      </React.Suspense>
    </AntdLayout>
  );
};

export default Layout;
