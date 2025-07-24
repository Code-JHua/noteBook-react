import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router'

export default function Router() {
  const Login = React.lazy(() => import('../pages/Login'))
  function WrapperRoutes() {
    const routes = [
      {
        path: '/',
        element: <Navigate to='/noteClass' />
      },
      {
        path: '/Login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
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
