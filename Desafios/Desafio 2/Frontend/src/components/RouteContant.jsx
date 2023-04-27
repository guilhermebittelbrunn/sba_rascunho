import { Breadcrumb, Layout, Alert, Space} from 'antd';
import { useState } from 'react';
const { Header, Content } = Layout;

export default function RouterContant({element, colorBgContainer, title}){
    const [alert,setAlert] = useState({status: true, message: 'Sucess', type: 'success'});

    function handleAlert(status, message, type){
      setAlert({
        status, message, message
      })
    }

    return(
            <div>
                {alert.status 
                && <Space direction="vertical"  style={{  width: '100%', }}>
                      <Alert message={alert.message} type={alert.type} />
                   </Space>}
                <Header className='Layout-Header'style={{background: colorBgContainer}}>
                  {title}
                </Header>
                <Content className='Layout-Content'>
                  <Breadcrumb className='Layout-Content-Breadcrumb'/>
                  <div style={{backgroundColor: colorBgContainer}}>
                    {element}
                  </div>
                </Content>
            </div>
    )
}