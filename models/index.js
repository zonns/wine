const Sequelize = require('sequelize')
const config = require('../config/config')
// 获取当前所在路径
const path = require('path')
const fs = require('fs')
const db = []

// 定义数据库配置
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)
// dirname 获取路径，readdirSync 同步读取文件 ，readFile 异步读取文件  file 文件
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db['sequelize'] = sequelize
module.exports = db
