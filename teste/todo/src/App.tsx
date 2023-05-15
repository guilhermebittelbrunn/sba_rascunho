import Login from './components/update/login'
import Register from './components/update/register'
import About from './components/about';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './components/nav/nav';
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


export default function App(){
  const [content, setContent] = useState(<About/>);

  const items: MenuItem[] = [
  getItem(<h4 onClick={()=>{setContent(<About/>)}}>About</h4>, '1', <PieChartOutlined />),
  getItem(<h4 onClick={()=>{setContent(<Login/>)}}>Login</h4>, '2', <PieChartOutlined />),
  getItem(<h4 onClick={()=>{setContent(<Register/>)}}>Register</h4>, '3', <DesktopOutlined />),
];

const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  return (
    <>
          <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{color: 'white', fontSize: '24px', textAlign: 'center', padding: '4px 0px'}}>Menu</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {content}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    </>
  )
}




