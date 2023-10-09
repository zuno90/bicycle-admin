import React from "react";

const Home = React.lazy(() => import("../pages/home/Home"));
const Category = React.lazy(() => import("../pages/home/Category"));
const Product = React.lazy(() => import("../pages/home/Product"));
const CreateProduct = React.lazy(() => import("../pages/home/CreateProduct"));
const Voucher = React.lazy(() => import("../pages/home/Voucher"));
const Chat = React.lazy(() => import("../pages/home/Chat"));
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
