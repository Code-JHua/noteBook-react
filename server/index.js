const Koa = require('koa')
const app = new Koa()
const userRouter = require('./router/user.js')
const cors = require('@koa/cors')
const { bodyParser } = require('@koa/bodyparser')
const noteRouter = require('./router/note.js')


app.use(cors()) // 告诉浏览器, 允许前端跨域请求

app.use(bodyParser({
  jsonLimit: '50mb',    // JSON请求体限制50MB
  formLimit: '50mb',    // 表单请求体限制50MB
  textLimit: '50mb',    // 文本请求体限制50MB
  enableTypes: ['json', 'form', 'text']
})) // 辅助 koa 解析请求体中的数据

// 1.被 app.use 调用的函数中一定拥有 ctx, next 参数
// 2.useRouter.routes()
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(noteRouter.routes()).use(noteRouter.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})