const Router = require('@koa/router')
const { verify } = require('../utils/jwt.js')
const { findNoteListByType, findNoteDetailById } = require('../controllers/index.js')

const router = new Router()

router.get('/findNoteListByType', verify(), async (ctx) => {
  const { note_type } = ctx.request.query  // 从请求体中获取参数
  console.log('接收到的note_type:', note_type); // 确认参数是否正确传递
  try {
    const res = await findNoteListByType(note_type, ctx.userId)
    console.log(res);
    
    if (res) {
      ctx.body = {
        code: '1',
        msg: '查询成功',
        data: res
      }
      
    } else {
      ctx.body = {
        code: '0',
        msg: '暂无数据',
        data: []
      }
    }
  } catch(error) {
    ctx.body = {
      code: '-1',
      msg: '查询失败',
      data: []
    }
  }
})

router.get('/findNoteDetailById', verify(), async (ctx) => {
  const { id } = ctx.request.query
  // console.log(id)
  try {
    const res = await findNoteDetailById(id)
    if (res) {
      ctx.body = {
        code: '1',
        msg: '查询成功',
        data: res
      }
    } else {
      ctx.body = {
        code: '0',
        msg: '暂无数据',
        data: []
      }
    }
  } catch (error) {
    ctx.body = {
      code: '-1',
      msg: '查询失败',
      data: []
    }
  }
})
module.exports = router