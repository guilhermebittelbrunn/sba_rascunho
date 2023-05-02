import {Button, Form, Input, Select} from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/newProduct.css'
import axios from 'axios';
const { TextArea } = Input;


export default function newProduct({handleAlert}){
  const isLog = useSelector((login)=>{
    return login
  })
  const [componentSize, setComponentSize] = useState('default');
  const [product, setProduct] = useState({IdUser: isLog.user.id,collection: '1A'});

  

  function onFormLayoutChange({size}){
      setComponentSize(size);
  }
  function handleChange(e){
     setProduct((preventValue)=>{
      return {...preventValue, [e.target.name]:e.target.value};
     })
   
  }

  async function handleFinish(){
    isLog.status 
    && 
    console.log(product);
    try{
      const data = await axios.post('http://localhost:3000/product', product);
      data.request.status === 201 
      &&
      setProduct({IdUser: isLog.user.id,collection: product.collection});
      handleAlert(true, 'Product add with successful!', 'success', true);
    }catch(err){
      console.log(err);
    }
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
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '12px',
        justifyItems: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Input showCount maxLength={20} onChange={handleChange} placeholder='Title' required name='title' value={product['title']}/>
      <TextArea showCount maxLength={100} onChange={handleChange} placeholder='Description'name='description' value={product['description']}/>
      <div style={{width: '100%'}}>
      <label>Collection</label>
      <Form.Item label="" style={{width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'red'}}>
        <Select style={{width: '100%'}} defaultValue="1A" onChange={(e)=>{
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
      </div>

      
            <Form.Item className='btn-submit'>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
            </Form.Item>
    
    </Form>
  );
};
