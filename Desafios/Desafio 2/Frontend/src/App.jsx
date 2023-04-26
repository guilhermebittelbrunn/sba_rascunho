
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const { Header, Content, Footer, Sider } = Layout;



import SideNav from './components/SideNav';


const App = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <BrowserRouter>
        <Layout className='Layout-main'>
          <SideNav/>
          {/* Site content */}
          <Layout className="site-layout">
            <Router colorBgContainer={colorBgContainer}/>
            <Footer className='Layout-Footer'>Footer content</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
  );
};
export default App; 