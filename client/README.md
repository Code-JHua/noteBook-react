# 移动端适配问题
rem: 相对于根元素的字体大小
例如: 根字体是 10px, 1re = 10px, 哟个容器设置为 10rem 宽, 当用户用更大的手机屏幕时, 根字体会更大, 容器也会更大, 但是 rem 是相对于根字体的, 所以容器的大小会保持不变

npm i lib-flexible --save

# 移动端 UI 库(组件库)
antd-mobile   npm i antd-mobile
react-vant   npm i react-vant

# css 预处理器
less   npm i less --save
sass   npm i sass --save

# html 标签重置样式
rest.css

# 项目梳理
- 安装路由 react-router-dom

1. 集中式路由配置
  - 集中式路由配置: 将所有路由配置集中在一个文件中, 方便管理
  - 路由的懒加载: 将每个页面的组件使用 React.lazy() 进行懒加载, 当用户访问某个路由时, 才加载该路由的组件, 而不是一次性加载所有路由的组件, 提高页面加载速度
  - 路由的 fallback: 当路由组件加载时, 会显示 fallback 中的内容, 直到路由组件加载完成, 才会显示路由组件

2. 开发登录页面
  - css 样式隔离 xxx.module.css
  - 发送登录请求 axios    (XMLHttpRequest, fetch, axios)
    1. 安装 axios npm i axios
    2. 引入 axios import axios from 'axios'
    3. 发送请求 