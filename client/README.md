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

# 路由传参
  1. navigate('/home?id=1')  useSearchParams() // 获取当前路由的参数

  2. navigate('/home/1')     配置路由时 :id 表示路由参数, useParams() // 获取当前路由参数

  3. navigate('/home', {     useLocation() 和第一种写法一样,但是好处是不会在 url 中显示参数
    state: {
      id: 1
    }
  })

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

3. 因为 react-vant Toast 组件不兼容 react19, 所以需要降版本到 react18 或者 采用第三方的 react-hot-toast 组件 

4. 登录鉴权(亮点, 难点)
  - 当用户未登录, 就访问首页时, 且首页在加载时会向后端返送请求
  - 后端在登录接口中生成一个令牌,将令牌一起返回给前端, 前端将令牌浏览器本地保存
  - 前端必须在后续的请求中都要携带该令牌供后端校验,如果校验不通过, 则返回 401 状态码, 前端需要捕获 401 状态码, 并跳转到登录页面

  - 以上功能实现了鉴权, 但是 token 在规定时间后会失效, 过期后需要重新登录, 体验很差.
  实现一个无感刷新 token 的效果:
    - 后端在登录节后返回一个长 token, 和一个短 token. 短 token 用来做鉴权, 长 token 用来刷新短 token 和 长 token

5. 首页 noteClass
  切页面

6. 列表页 noteList
  - 手动封装下拉刷新组件, 下拉组件中监听手指的 touch 事件, 根据手指在 Y 轴移动距离来控制容器向下平移的距离, 从而展示出头部的 下拉刷新 字样, 当用户松开手指时, 如果移动距离大于 75px, 则触发下拉刷新事件, 否则不触发下拉刷新事件