import { Breadcrumb, Layout} from 'antd';
import AlertSpam from './Alert';
import '../styles/RouterContant.css'
const { Header, Content } = Layout;

export default function RouterContant({element, colorBgContainer, title, alert, description}){

    return(
            <div>
               
                <AlertSpam status={alert.status} message={alert.message} type={alert.type} close={alert.close}/>
                <Header className='Layout-Header'>
                  {title}
                </Header>
                <Content className='Layout-Content'>
                  <Breadcrumb className='Layout-Content-Breadcrumb'>
                    <h3>{description}</h3>
                  </Breadcrumb>
                  <div style={{backgroundColor: colorBgContainer}}>
                      {element}
                  </div>
                </Content>
            </div>
    )
}