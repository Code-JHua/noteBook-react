const Router = require('@koa/router')
const axios = require('axios')
const path = require('path')
const router = new Router()
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') })

// AI优化笔记内容
router.post('/api/optimize-note', async (ctx) => {
  try {
    const { content } = ctx.request.body
    
    if (!content) {
      ctx.body = {
        success: false,
        message: '内容不能为空'
      }
      return
    }

    // 调用DeepSeek API
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的文本优化助手。请帮助用户优化他们的笔记内容，使其更加清晰、有条理、易读。保持原意不变，但改善表达方式、语法和结构。请直接返回优化后的内容，不要添加额外的说明。'
        },
        {
          role: 'user',
          content: `请优化以下笔记内容：\n\n${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      }
    })

    const data = response.data
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      ctx.body = {
        success: true,
        optimizedContent: data.choices[0].message.content
      }
    } else {
      ctx.body = {
        success: false,
        message: 'AI优化失败，请稍后重试'
      }
    }
  } catch (error) {
    console.error('AI优化错误:', error)
    ctx.body = {
      success: false,
      message: 'AI优化失败，请稍后重试'
    }
  }
})

module.exports = router