import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;

const Main: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }} />
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "User" }, { title: "Bill" }]}
        />
        <div
          style={{ padding: 24, minHeight: 360, background: colorBgContainer }}
        >
          Bill is a cat.
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Main;
