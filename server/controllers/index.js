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
// 查找账号是否存在
const findUser = (username) => {
  let _sql = `select * from users where username='${username}'`
  return allServices.query(_sql)
}
// 注册接口要执行的函数
const userRegister = (username, password, nickname, create_time) => {
  let _sql = `insert into users (username, password, nickname, create_time) values ('${username}', '${password}', '${nickname}', '${create_time}')`
  return allServices.query(_sql)
}

// 根据类型查找笔记列表
const findNoteListByType = (note_type, userId) => {
  let _sql = `select * from note where note_type='${note_type}' and user_id='${userId}'`
  return allServices.query(_sql)
}

// 根据id查找笔记详情
const findNoteDetailById = (id) => {
  let _sql = `select * from note where id='${id}'`
  return allServices.query(_sql)
}

module.exports = {
  userLogin,
  findUser,
  userRegister,
  findNoteListByType,
  findNoteDetailById
}