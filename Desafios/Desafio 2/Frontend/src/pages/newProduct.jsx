import {Button, Form, Input, Select} from 'antd';
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
         <Input showCount maxLength={20} onChange={onChange} placeholder='Title' required/>
        <TextArea showCount maxLength={100} onChange={onChange} placeholder='Description'/>
      <Form.Item label="Collection">
        <Select defaultValue="1A">
          <Select.Option value="1A">1A</Select.Option>
          <Select.Option value="1B">1B</Select.Option>
          <Select.Option value="2A">2A</Select.Option>
          <Select.Option value="2B">2B</Select.Option>
          <Select.Option value="3A">3A</Select.Option>
          <Select.Option value="3B">3B</Select.Option>
        </Select>
      </Form.Item>

      
            <Form.Item>
                <Button type="primary" htmlType="submit">
                Save
                </Button>
            </Form.Item>
    
    </Form>
  );
};
