import { useState } from "react";
import { TableOutlined,  InfoOutlined, LoginOutlined, PlusOutlined, LogoutOutlined} from '@ant-design/icons';
import { Menu, Layout } from "antd";
import useCreateLink from "../hooks/useCreateLink";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { Sider } = Layout;


let items = [
  useCreateLink(<Link to='/about'>About</Link>, '1', <InfoOutlined />),
  useCreateLink(<Link to='/products'>Products</Link>, '2', <TableOutlined />),
  useCreateLink(<Link to="/product">New product</Link>, '3', <PlusOutlined />),
  useCreateLink(<Link to='/login'>Login</Link>, '4', <LoginOutlined/>),
];
  

export default function SideNav(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);
    const isLog = useSelector(login=>{return login});
    
    let [links] = useState(items);

    function logout(){
        dispatch({type: 'LOGOUT'})
        navigate('/login');
    }
    
    if(isLog.status){
        links = links.filter((link)=>{
            if(link.key != '4'){
                return link
            }
        })
        links.push(useCreateLink(
            <div onClick={logout}>Logout</div>,     '4', 
            <LogoutOutlined onClick={logout} style={{transform: 'rotate(180deg)'}}/>
        ))
    }

    return(
       <>
            {/* Side-bar menu */}
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {/* Header */}
            {collapsed ?<div className='Sider-div-title'>FS</div>:<div className='Sider-div-title'>FakeStore</div>}
            {/* Links */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={links} />
        </Sider>
       </>
    )
}

