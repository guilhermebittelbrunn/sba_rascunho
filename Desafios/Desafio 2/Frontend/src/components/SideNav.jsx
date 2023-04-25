import { useState } from "react";
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu, Layout } from "antd";
import useCreateLink from "../hooks/useCreateLink";
const { Sider } = Layout;
import { Link } from "react-router-dom";



const items = [
  useCreateLink('teste', '1', <DesktopOutlined />),
  useCreateLink('Files', '2', <FileOutlined />),
  useCreateLink('Files', '3', <FileOutlined />),
  useCreateLink('Files', '4', <FileOutlined />),
  useCreateLink('Files', '5', <FileOutlined />),
];
  



export default function SideNav(){

    const [collapsed, setCollapsed] = useState(false);

    return(
       <>
            {/* Side-bar menu */}
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {/* Header */}
            <div className='Sider-div-title'> </div>
            {/* Links */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
       </>
    )
}