import React from "react";

const Home = React.lazy(() => import("../pages/home/Home"));
const Category = React.lazy(() => import("../pages/home/Category"));
const Product = React.lazy(() => import("../pages/home/product/Product"));
const CreateProduct = React.lazy(
  () => import("../pages/home/product/CreateProduct")
);
const Voucher = React.lazy(() => import("../pages/home/voucher/Voucher"));
const CreateVoucher = React.lazy(
  () => import("../pages/home/voucher/CreateVoucher")
);
const Chat = React.lazy(() => import("../pages/home/chat/Chat"));
const User = React.lazy(() => import("../pages/home/User"));

const dashboardRoutes = [
  {
    path: "/",
    title: "Trang chủ",
    element: Home,
  },
  {
    path: "/category",
    title: "Danh mục",
    element: Category,
  },
  {
    path: "/product",
    title: "Sản phẩm",
    element: Product,
  },
  {
    path: "/product/create",
    title: "Thêm Sản phẩm",
    element: CreateProduct,
  },
  {
    path: "/voucher",
    title: "Khuyến mãi",
    element: Voucher,
  },
  {
    path: "/voucher/create",
    title: "Tạo mã khuyến mãi",
    element: CreateVoucher,
  },
  {
    path: "/chat",
    title: "Chat",
    element: Chat,
  },
  {
    path: "/user",
    title: "Quản lý người dùng",
    element: User,
  },
];

const routes = [...dashboardRoutes];
export default routes;
