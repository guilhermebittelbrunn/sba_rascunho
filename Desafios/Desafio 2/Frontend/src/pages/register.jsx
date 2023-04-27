import {Button,Checkbox,Form,Input,Alert, Space} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function Login(){ 
  const [user,setUser] = useState({});
 
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {console.log('Received values of form: ', values)}

  function handleChange(e){
    setUser((preventValue)=>{
        return {...preventValue, [e.target.name] : e.target.value}
    })
    
  }
//   function handleClickk(e){
//     e.preventDefault();
//     axios.post('http://localhost:3000/user', user).then(res=>{
//         console.log('fui')
//         console.log(res);
//     })
  async function handleClick(e){
    e.preventDefault();
    try{
        const data = await axios.post('http://localhost:3000/user', user);
       
        
      
        navigate('/login');
    }catch(err){
        err.request.status === 400 && alert('Email em uso');
    }
  }


  return (
    <>
      
        <Form className='Form'
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input onChange={handleChange} name='email'/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password onChange={handleChange} name='password'/>
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="name"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[
                {
                    required: true,
                    message: 'Please input your name!',
                    whitespace: true,
                },
                ]}
            >
                <Input onChange={handleChange} name='name'/>
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                {
                    validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={handleClick}>
                Register
                </Button>
            </Form.Item>
             <Link to={'/login'}>Already have an account? Login now</Link>
   
        </Form>
       
    </>
  );
};
