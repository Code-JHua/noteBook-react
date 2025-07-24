const Koa = require('koa')
const app = new Koa()
const userRouter = require('./router/user.js')
const cors = require('@koa/cors')
const { bodyParser } = require('@koa/bodyparser')

// app.use(async (ctx) => {
//   console.log(ctx)
//   if (ctx.req.url === '/home') {
//     ctx.body = 'hello koa'
//   }
// })
app.use(cors()) // 告诉浏览器, 允许前端跨域请求
app.use(bodyParser()) // 辅助 koa 解析请求体中的数据
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})