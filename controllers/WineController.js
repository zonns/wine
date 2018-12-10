const { Wine } = require('../models/')
const config = require('../config/config')
const Language = require('../config/language')

module.exports = {
  async show (req, res) {
    const language = req.params.language
    if (config.allowedLanguage.indexOf(language) < 0) {
      return res.status('400').send('访问的页面不存在')
    }
    config.language = req.params.language
    console.log(req.params)
    const wine = await Wine.findOne()
    console.log(wine.toJSON())
  },
  async list (req, res) {
    const wines = await Wine.findAll({
      limit: 10,
      order: [
        ['created_at', 'DESC']
      ]
    })
    const language = req.params.language
    res.render('../views/web/list.ejs', {
      language: language,
      i18n: Language[language],
      wines: wines
    })
  },
  async detail (req, res) {
    const wines = await Wine.findById(req.params.id)
    const language = req.params.language
    res.render('../views/web/listContent.ejs', {
      language: language,
      i18n: Language[language],
      wines: wines
    })
  }
}
