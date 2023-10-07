import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout as AntdLayout } from "antd";
const Sidebar = React.lazy(() => import("./Sidebar"));
const Home = React.lazy(() => import("./Home"));
const Category = React.lazy(() => import("./Category"));
const Product = React.lazy(() => import("./Product"));
const Voucher = React.lazy(() => import("./Voucher"));
const Chat = React.lazy(() => import("./Chat"));
const User = React.lazy(() => import("./User"));

const Layout: React.FC = () => {
  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <React.Suspense>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </React.Suspense>
    </AntdLayout>
  );
};

export default Layout;
