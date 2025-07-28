import React from 'react'
import style from './index.module.less'
import avatar from '../../assets/img/avatar.png'
import { Button, Input, Form, Toast } from 'react-vant'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = values => {
    // console.log(values)
    const res = axios.post('/user/register', values)
      Toast.success('注册成功,快去登录吧')
      setTimeout(() => {
        navigate('/login?', {state: {username: values.username, password: values.password}})
      }, 1000)
  }

  return (
    <div className={`${style.register} animate__animated animate__zoomIn`}>
      <h1 className={style.title}>注册</h1>
      <div className={style['register-wrapper']}>
        <div className={style.avatar}>
          <img width="100%" height="100%" src={avatar} alt="" />
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '20px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                注册
              </Button>
            </div>
          }
        >
          <Form.Item
            rules={[{ required: true, message: '请填写用户名' }]}
            name='username'
            label='用户名'
            labelWidth={50}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写密码' }]}
            name='password'
            label='密码'
            labelWidth={50}
          >
            <Input placeholder='请输入密码' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写昵称' }]}
            name='nickname'
            label='昵称'
            labelWidth={50}
          >
            <Input placeholder='请输入昵称' />
          </Form.Item>
        </Form>
      </div>
      <p className={style['register-tip']} onClick={() => navigate('/login')}>
        有账号？<span>去登录</span>
      </p>
    </div>
  )
}
