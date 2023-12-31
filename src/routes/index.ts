import React from "react";

const Order = React.lazy(() => import("../pages/home/order/Order"));
const OrderDetail = React.lazy(() => import("../pages/home/order/OrderDetail"));
const OrderInvoice = React.lazy(
  () => import("../pages/home/order/OrderInvoice")
);
const Transaction = React.lazy(
  () => import("../pages/home/transaction/Transaction")
);
const TransactionDetail = React.lazy(
  () => import("../pages/home/transaction/TransactionDetail")
);
const Category = React.lazy(() => import("../pages/home/category/Category"));
const CategoryDetail = React.lazy(
  () => import("../pages/home/category/CategoryDetail")
);
const Product = React.lazy(() => import("../pages/home/product/Product"));
const ProductDetail = React.lazy(
  () => import("../pages/home/product/ProductDetail")
);
const CreateProduct = React.lazy(
  () => import("../pages/home/product/CreateProduct")
);
const Voucher = React.lazy(() => import("../pages/home/voucher/Voucher"));
// const VoucherDetail = React.lazy(
//   () => import("../pages/home/voucher/VoucherDetail")
// );
const CreateVoucher = React.lazy(
  () => import("../pages/home/voucher/CreateVoucher")
);
const Chat = React.lazy(() => import("../pages/home/chat/Chat"));
const User = React.lazy(() => import("../pages/home/user/User"));
const UserDetail = React.lazy(() => import("../pages/home/user/UserDetail"));
const Others = React.lazy(() => import("../pages/home/others/Others"));
const Test = React.lazy(() => import("../pages/home/test/Test"));

const dashboardRoutes = [
  {
    path: "",
    index: true,
    title: "Trang chủ",
    element: Order,
  },
  {
    path: "/order/:id",
    title: "Chi tiết đơn hàng",
    element: OrderDetail,
  },
  {
    path: "/order/invoice/:id",
    title: "Chi tiết đơn hàng",
    element: OrderInvoice,
  },
  {
    path: "/transaction",
    title: "Giao dịch",
    element: Transaction,
  },
  {
    path: "/transaction/:id",
    title: "Chi tiết giao dịch",
    element: TransactionDetail,
  },
  {
    path: "/category",
    title: "Danh mục",
    element: Category,
  },
  {
    path: "/category/:id",
    title: "Chi tiết danh mục",
    element: CategoryDetail,
  },
  {
    path: "/product",
    title: "Sản phẩm",
    element: Product,
  },
  {
    path: "/product/:id",
    title: "Cập nhật sản phẩm",
    element: ProductDetail,
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
  // {
  //   path: "/voucher/:id",
  //   title: "Cập nhật khuyến mãi",
  //   element: VoucherDetail,
  // },
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
  {
    path: "/user/:id",
    title: "Thông tin người dùng",
    element: UserDetail,
  },
  {
    path: "/others",
    title: "Khác",
    element: Others,
  },
];

const routes = [...dashboardRoutes];
export default routes;
