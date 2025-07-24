const Router = require('@koa/router')
const router = new Router()
const {userLogin} = require('../controllers/index')

router.prefix('/user') // 路由前缀

router.post('/login', async (ctx) => {
  // 1. 获取请求体中的 username, password
  // post 请求携带的参数都在请求体中
  const { username, password } = ctx.request.body
  console.log(username, password);
  // 2. 检查账号密码是否合法
  // 去数据库查找账号密码是否正确
  const res = await userLogin(username, password)

  try {
    if (res.length) {
      let data = {
        id: res[0].id,
        username: res[0].username,
        create_time: res[0].create_time,
        nickname: res[0].nickname
      }
      ctx.body = {
        code: '1',
        msg: '登录成功',
        data: data
      }
    } else {
      ctx.body = {
        code: '0',
        msg: '登录失败',
        data: {}
      }
    }
  } catch (error) { // 程序性错误
    ctx.body = {
      code: '-1',
      msg: '服务器错误',
      data: error
    }
  }
})
module.exports = router