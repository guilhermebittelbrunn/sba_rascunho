import { Layout, theme } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SideNav from './components/SideNav';
import loginReducer from './reducer/reducer';

const {Footer} = Layout;
const store = createStore(loginReducer);

const App = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
      <BrowserRouter>
        <Provider store={store}>
          <Layout className='Layout-main'>
            <SideNav/>
            {/* Site content */}
            <Layout className="site-layout">
              <Router colorBgContainer={colorBgContainer}/>
              <Footer className='Layout-Footer'>₢Created by...</Footer>
            </Layout>
          </Layout>
        </Provider>
      </BrowserRouter>
  );
};
export default App; 

