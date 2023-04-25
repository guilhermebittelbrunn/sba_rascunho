
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Teste from './components/teste';
import './App.css'
const { Header, Content, Footer, Sider } = Layout;
import About from './pages/about';
import { Navigate } from 'react-router-dom';





import SideNav from './components/SideNav';


const App = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='Layout-main'>
      <SideNav/>
      
      {/* Site content */}
      <Layout className="site-layout">
        {/* Title page */}
        <Header className='Layout-Header'style={{background: colorBgContainer}}>Teste</Header>
        {/* containter page */}
        <Content className='Layout-Content'>
          {/* subtitle/path page */}
          <Breadcrumb className='Layout-Content-Breadcrumb'></Breadcrumb>
          {/* content container */}
          <div style={{backgroundColor: colorBgContainer}}>
            <About/>
          </div>
        </Content>

        {/* footer */}
        <Footer className='Layout-Footer'>Footer content</Footer>
      </Layout>
    </Layout>
  );
};
export default App;