import { Breadcrumb, Layout} from 'antd';
const { Header, Content } = Layout;

export default function RouterContant({element, colorBgContainer, title}){
    return(
            <div>
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