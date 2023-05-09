import { Alert, Space} from 'antd';
import '../styles/Alert.css'

export default function AlertSpam({status, message, type, close}){


      function setColor(type){
      switch(type){
      case 'success':
          return 'green'
      case 'warning':
          return 'yellow'
      case 'error':
          return 'red'
    }
    }
    const color = setColor(type)
            return(
            <>
                {status && 
                <Space direction="vertical"  style={{ width: '100%' }}>
                    <Alert className='Alert' message={message} type={type} showIcon closable={false} 
                    description={<div className='time-bar' style={{backgroundColor: color}}></div>}/>
                </Space>}
            </>
        )
        }
    
