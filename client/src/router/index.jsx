import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router'

export default function Router() {
  // 路由懒加载
  const Login = React.lazy(() => import('../pages/Login'))
  const Register = React.lazy(() => import('../pages/Register'))
  const NoteClass = React.lazy(() => import('../pages/NoteClass'))
  const NoteList = React.lazy(() => import('../pages/NoteList'))

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
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<div style={{textAlign:'center'}}>Loading...</div>}>
            <Register />
          </Suspense>
        )
      },
      {
        path: '/noteList/:category',
        element: (
          <Suspense fallback={<div style={{textAlign:'center'}}>Loading...</div>}>
            <NoteList />
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
