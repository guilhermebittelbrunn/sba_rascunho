import { useState } from "react";
import { TableOutlined,  InfoOutlined, LoginOutlined, PlusOutlined} from '@ant-design/icons';
import { Menu, Layout } from "antd";
import useCreateLink from "../hooks/useCreateLink";
import { Link } from "react-router-dom";

const { Sider } = Layout;

import useFetch from "../hooks/useFetch";

const items = [
  useCreateLink(<Link to='/about'>Início</Link>, '1', <InfoOutlined />),
  useCreateLink(<Link to='/products'>Produtos</Link>, '2', <TableOutlined />),
  useCreateLink(<Link to="/product">Novo produto</Link>, '3', <PlusOutlined />),
  useCreateLink(<Link to='/login'>Login</Link>, '4', <LoginOutlined />),
];
  

import axios from "axios";

export default function SideNav(){

    const [collapsed, setCollapsed] = useState(false);
    
    // (async()=>{
    //     const {info, isLoading, error} = useFetch('http://localhost:3000/product/');
    //     console.log(info);
    // })()




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

