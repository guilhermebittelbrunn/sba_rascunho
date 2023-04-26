import {Form, Input, Select} from 'antd';
import { useState } from 'react';

const { TextArea } = Input;


export default function newProduct(){

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
         <Input showCount maxLength={20} onChange={onChange} />
        <TextArea showCount maxLength={100} onChange={onChange} />
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
    
    </Form>
  );
};
