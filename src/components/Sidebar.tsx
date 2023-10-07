import React from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
import { useNavigate } from "react-router-dom";

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
): MenuItem => {
  return { key, children, label } as MenuItem;
};

const items: MenuItem[] = [
  getItem("Trang chủ", "/"),
  getItem("Danh mục", "category"),
  getItem("Sản phẩm", "product"),
  getItem("Khuyến mãi", "voucher"),
  getItem("Chat", "chat"),
  getItem("Quản lý người dùng", "user"),
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        defaultSelectedKeys={["/"]}
        mode="inline"
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;
