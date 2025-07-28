// 转义标签, 防止 sql 注入
const escape = (str) => {
  return str.replace(/[<>&'"]/g, (match) => {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&#39;'
      case '"':
        return '&quot;'
    }
  })
}

module.exports = {
  escape
}