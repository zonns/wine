const { Content } = require('../models/')
const Language = require('../config/language')

module.exports = {
  async Content (req, res) {
    const getContent = await Content.findOne({
      where: [{
        key: 'story'
      }]
    })
    const language = req.params.language
    console.log(getContent)
    res.render('../views/web/story.ejs', {
      language: language,
      i18n: Language[language],
      content: getContent
    })
  }
}
