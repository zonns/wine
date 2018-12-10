const WineController = require('./controllers/WineController')
const AdminController = require('./controllers/AdminController')
const ContentController = require('./controllers/ContentController')
const Language = require('./config/language')
const config = require('./config/config')
const AdminPolicy = require('./policies/AdminPolicy')

module.exports = function (app) {
  app.get('/admin/login',
    AdminController.login
  )
  app.post('/admin/login',
    AdminController.loginCheck
  )
  app.get('/admin/logout',
    AdminPolicy.isLogin,
    AdminController.logout
  )
  app.get('/admin',
    AdminPolicy.isLogin,
    (req, res) => {
      res.redirect('/admin/wine/list')
    }
  )
  app.get('/admin/wine/list',
    AdminPolicy.isLogin,
    AdminController.wineList
  )
  app.get('/admin/wine/create',
    AdminPolicy.isLogin,
    AdminController.wineCreate
  )
  app.get('/admin/wine/:id',
    AdminPolicy.isLogin,
    AdminController.wineEdit
  )
  app.put('/admin/wine/:id',
    AdminPolicy.isLogin,
    AdminController.wineEditSave
  )
  app.delete('/admin/wine/:id',
    AdminPolicy.isLogin,
    AdminController.wineDelete
  )
  app.post('/admin/wine/',
    AdminPolicy.isLogin,
    AdminController.wineCreateSave
  )
  app.get('/admin/story',
    AdminPolicy.isLogin,
    AdminController.story
  )
  app.put('/admin/story',
    AdminPolicy.isLogin,
    AdminController.storyEditSave
  )

  app.use('/:language/wine', (req, res, next) => {
    const language = req.params.language
    if (config.allowedLanguage.indexOf(language) < 0) {
      return res.status('400').send('访问的页面不存在')
    }
    config.language = req.params.language
    req.language = language
    next()
  })
  app.get('/:language/wine/', (req, res) => {
    const language = req.params.language
    res.render('web/index.ejs', {
      language: language,
      i18n: Language[language]
    })
  })
  app.get('/:language/wine/list',
    WineController.list
  )
  app.get('/:language/wine/story',
    ContentController.Content
  )
  app.get('/:language/wine/:id',
    WineController.detail
  )

  // 使用指定的http状态码，重定向到指定的URL
  app.get('/', (req, res) => {
    res.redirect(301, '/en/wine')
  })
}
