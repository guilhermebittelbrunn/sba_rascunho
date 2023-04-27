import { Alert, Space} from 'antd';

export default function AlertSpam({status, message, type, close}){
        if(status){
            return(
            <>
                <Space direction="vertical"  style={{ width: '100%' }}>
                    <Alert message={message} type={type} showIcon closable={close}/>
                </Space>
            </>
        )
        }
    }
