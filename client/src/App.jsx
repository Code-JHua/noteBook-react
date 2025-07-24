import React from 'react'
import { Button } from 'react-vant'
import Router from './router'
import Toast from './components/Toast'

export default function App() {
  
  
  return (
    <>
      <Router />
      { <Toast msg='登录成功' type='success' onClose={onClose} duration={2000} />}
    </>
  )
}
