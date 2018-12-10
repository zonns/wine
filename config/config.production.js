module.exports = {
  port: process.env.PORT || 3000,
  language: 'en',
  allowedLanguage: ['en', 'cn'],
  db: {
    database: 'wine',
    username: 'root',
    password: 'HuiLong123#@!',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      define: {
        paranoid: true,
        underscored: true
      }
    }
  }
}
