import React from 'react'
import style from './index.module.less'
import avatar from '../../assets/img/avatar.png'
import { Button, Input, Form, Toast } from 'react-vant'
import axios from '../../api'

export default function Login() {
  const [form] = Form.useForm()
  const onFinish = values => {
    console.log(values)
    axios.post('/user/login', values).then(res => {
      console.log(res);
      Toast.success('登录成功')
    })
  }


  return (
    <div className={`${style.login} animate__animated animate__zoomIn`}>
      <h1 className={style.title}>登录</h1>
      <div className={style['login-wrapper']}>
        <div className={style.avatar}>
          <img width="100%" height="100%" src={avatar} alt="" />
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '20px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                登录
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
        </Form>
      </div>
      <p className={style['login-tip']}>
        没有账号？<span>去注册</span>
      </p>
    </div>
  )
}
