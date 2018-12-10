module.exports = {
  port: process.env.PORT || 3000,
  language: 'en',
  allowedLanguage: ['en', 'cn'],
  db: {
    database: 'wine',
    username: 'root',
    password: 'huilong123',
    options: {
      host: '10.0.2.10',
      dialect: 'mysql',
      define: {
        paranoid: true,
        underscored: true
      }
    }
  }
}
