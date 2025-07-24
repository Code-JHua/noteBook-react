const config = require('../config/index.js')

// 数据库相关操作
const mysql = require('mysql2/promise')

// 创建线程池 (连接池)
const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
})

// 数据库操作
const allServices = {
  async query(sql, values) {
    try {
      // 通过连接池连接 mysql
      const connection = await pool.getConnection()
      // 执行各种增, 删, 改, 查的 sql 语句
      const [rows, fields] = await connection.query(sql, values)
      // 释放连接
      pool.releaseConnection(connection)
      // 返回查询结果
      return Promise.resolve(rows)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

// 登录接口要执行的函数
const userLogin = (username, password) => {
  let _sql = `select * from users where username='${username}' and password='${password}'`
  return allServices.query(_sql)
}

module.exports = {
  userLogin
}