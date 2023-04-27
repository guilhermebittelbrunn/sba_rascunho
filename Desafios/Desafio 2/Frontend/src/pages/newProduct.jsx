import {Button, Form, Input, Select} from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const { TextArea } = Input;


export default function newProduct(){
  const [componentSize, setComponentSize] = useState('default');
  const [product, setProduct] = useState({collection: '1A'});
  const isLog = useSelector((login)=>{
    return login
  })
 

  function onFormLayoutChange({size}){
      setComponentSize(size);
  }
  function handleChange(e){
     setProduct((preventValue)=>{
      return {...preventValue, [e.target.name]:e.target.value};
     })
   
  }

  function handleFinish(){
 
    console.log(isLog.status? 'Para o usuário: ' + isLog.user.id : 'faça login');
  }

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
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Input showCount maxLength={20} onChange={handleChange} placeholder='Title' required name='title'/>
      <TextArea showCount maxLength={100} onChange={handleChange} placeholder='Description'name='description'/>
      <Form.Item label="Collection">
        <Select defaultValue="1A" onChange={(e)=>{
          setProduct((preventValue)=>{
          return {...preventValue, ['collection']:e};
        })
        }}>
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
