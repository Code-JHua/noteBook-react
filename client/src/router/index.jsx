import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router'
import NoteClass from '../pages/NoteClass'

export default function Router() {
  // 路由懒加载
  const Login = React.lazy(() => import('../pages/login'))

  function WrapperRoutes() {
    const routes = [
      {
        path: '/',
        element: <Navigate to='/noteClass' />
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div style={{textAlign:'center'}}>Loading...</div>}>
            <Login />
          </Suspense>
        )
      },
      {
        path: '/noteClass',
        element: (
          <Suspense fallback={<div style={{textAlign:'center'}}>Loading...</div>}>
            <NoteClass />
          </Suspense>
        )
      }
    ]
    return useRoutes(routes)
  }

  return (
    // 声明路由模式 
    <BrowserRouter>
      {/* 路由出口,所有路由组件最终都会渲染到出口位置 */}
      <WrapperRoutes />
    </BrowserRouter>
  )
}
