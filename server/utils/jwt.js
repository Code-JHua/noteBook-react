// const jwt = require('jsonwebtoken')

// function sign(options, expiresIn) {
//   return jwt.sign(options, 'xiaohu', {
//     expiresIn: expiresIn || '86400' 
//   })
// }

// function verify() {  //校验 access_token
//   return async(ctx, next) => {
//     const token = ctx.headers.authorization
//     if (!token) {
//       ctx.status = 401
//       ctx.body = {
//         code: '401',
//         msg: '请登录',
//       } 
//     } else {
//       // 校验合法
//       try {
//         const decoded = jwt.verify(token, 'xiaohu')
//         console.log(decoded);
        
//         if (decoded.id) { //合法
//           await next()
//         }

//       } catch (error) {
//         ctx.status = 401
//         ctx.body = {
//           code: '401',
//           msg: '未登录',
//         }
//       }
//     }
//   }
// }

// function refreshVerify(token) {
//   try {
//     const decoded = jwt.verify(token, 'xiaohu')
//     if(decoded.id) {
//       return decoded
//     }
//   } catch (error) {
//     return false
//   }
// }

// module.exports = {
//   sign,
//   verify,
//   refreshVerify
// }

const jwt = require('jsonwebtoken')

function sign(options, time) {
  return jwt.sign(options, '666', {
    expiresIn: time || '86400' // 一天过期
  })
}

function verify() {
  return async (ctx, next) => {
    const token = ctx.headers.authorization
    if (token) {
      // 校验合法
      try {
        const decoded = jwt.verify(token, '666')
        // console.log(decoded);
        if (decoded.id) { // 合法
          await next()
        }
      } catch (error) {
        ctx.status = 401
        ctx.body = {
          code: '0',
          msg: '登录失效'
        }
      }

    } else {
      ctx.status = 401
      ctx.body = {
        code: '0',
        msg: '请重新登录'
      }
    }
  }
}

function refreshVerify(token) {
  try {
    const decoded = jwt.verify(token, '666')
    if (decoded.id) {
      return decoded
    }
  } catch (error) {
    return false
  }
}

module.exports = {
  sign,
  verify,
  refreshVerify
}