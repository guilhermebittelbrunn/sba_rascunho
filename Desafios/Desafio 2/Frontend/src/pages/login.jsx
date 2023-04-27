import {Button,Form,Input} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

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
export default function Login({handleAlert}){
  const [user,setUser] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function handleChange(e){
    setUser((preventValue)=>{
        return {...preventValue, [e.target.name] : e.target.value}
    })
  }



  async function handleFinish(){
    try{
        const {data} = await axios.post('http://localhost:3000/user/log', user);
        data.logged && 
        dispatch({type: 'LOGIN', payload: data.user[0]});
        navigate('/about')
    }catch(err){
        err.request.status === 400 &&  handleAlert(true, 'E-mail/password incorrect!', 'error');
    }
  }

  return (
    <>
        <Form className='Form'
            {...formItemLayout}
            form={form}
            name="register"
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
            onFinish={handleFinish}
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
                <Input onChange={handleChange} name='email' />
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
            >
                <Input.Password onChange={handleChange} name='password'/>
            </Form.Item>
        
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                Login
                </Button>
            </Form.Item>

            <Link to={'/register'}>Don't have an account yet?  Sign Up</Link>
            
        </Form>
    </>
  );
};
