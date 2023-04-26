import { useState } from "react";
import { TableOutlined,  InfoOutlined, LoginOutlined, PlusOutlined} from '@ant-design/icons';
import { Menu, Layout } from "antd";
import useCreateLink from "../hooks/useCreateLink";
import { Link } from "react-router-dom";

const { Sider } = Layout;

import useFetch from "../hooks/useFetch";

const items = [
  useCreateLink(<Link to='/about'>About</Link>, '1', <InfoOutlined />),
  useCreateLink(<Link to='/products'>Produtos</Link>, '2', <TableOutlined />),
  useCreateLink('Novo produto', '3', <PlusOutlined />),
  useCreateLink('Login', '4', <LoginOutlined />),
];
  



export default function SideNav(){

    const [collapsed, setCollapsed] = useState(false);

    return(
       <>
            {/* Side-bar menu */}
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {/* Header */}
            {collapsed ?<div className='Sider-div-title'>FS</div>:<div className='Sider-div-title'>FakeStore</div>}
            {/* Links */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
       </>
    )
}

