import { Breadcrumb, Layout, Space} from 'antd';
import { useState } from 'react';
import AlertSpam from './Alert';
const { Header, Content } = Layout;

export default function RouterContant({element, colorBgContainer, title, alert}){

    return(
            <div>
               
                <AlertSpam status={alert.status} message={alert.message} type={alert.type} close={alert.close}/>
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