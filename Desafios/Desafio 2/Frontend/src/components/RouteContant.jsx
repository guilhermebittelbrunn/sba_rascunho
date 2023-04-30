import { Breadcrumb, Layout} from 'antd';
import AlertSpam from './Alert';
import '../styles/RouterContant.css'
const { Header, Content } = Layout;

const divStyle = {
  padding: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // border: '5px solid red',
  flexDirection: 'column',
  width: '95%',
  margin: '8px auto 24px'
}

export default function RouterContant({element, colorBgContainer, title, alert, description}){

    return(
            <>
               
                <AlertSpam status={alert.status} message={alert.message} type={alert.type} close={alert.close}/>
                <Header className='Layout-Header'>
                  {title}
                </Header>
                <Content className='Layout-Content'>
                  <Breadcrumb className='Layout-Content-Breadcrumb'>
                    <h3>{description}</h3>
                  </Breadcrumb>
                  <div style={{...divStyle, backgroundColor: colorBgContainer}}>
                      {element}
                  </div>
                </Content>
            </>
    )
}