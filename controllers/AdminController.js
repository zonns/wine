const { Wine, Content } = require('../models')
const moment = require('moment')
const md5 = require('md5')

module.exports = {
  login (req, res) {
    res.render('admin/login.ejs')
  },
  logout (req, res) {
    req.session.destroy()
    res.redirect('/admin/login')
  },
  async wineList (req, res) {
    const wines = await Wine.findAll({
      limit: 10,
      order: [
        ['created_at', 'DESC']
      ]
    })
    res.render('admin/wine/index.ejs', {
      wines: wines,
      moment: moment
    })
  },
  loginCheck (req, res) {
    const { username, password } = req.body
    if (username === 'administrator' && md5(password) === '661394321cdc95f70a5661405aa2fb68') {
      req.session.isLogin = true
      res.json({
        code: 200,
        result: 'login success'
      })
    } else {
      res.status(403).json({
        code: '403',
        result: '用户名密码错误'
      })
    }
  },
  async wineEdit (req, res) {
    const wine = await Wine.findById(req.params.id)
    res.render('admin/wine/edit.ejs', {
      wine: wine
    })
  },
  async wineDelete (req, res) {
    try {
      await Wine.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send({
        code: 200,
        result: '数据删除成功'
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        code: 500,
        result: '服务器异常，数据删除失败'
      })
    }
  },
  async wineCreate (req, res) {
    res.render('admin/wine/edit.ejs', {
      wine: []
    })
  },
  async wineEditSave (req, res) {
    await Wine.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.send({
      code: 200,
      msg: 'ok'
    })
  },
  async wineCreateSave (req, res) {
    await Wine.create(req.body)
    res.send({
      code: 200,
      msg: 'ok'
    })
  },
  async story (req, res) {
    const story = await Content.findOne({
      where: {
        key: 'story'
      }
    })
    res.render('admin/about/edit.ejs', {
      story: story
    })
  },
  async storyEditSave (req, res) {
    await Content.update(req.body, {
      where: {
        key: 'story'
      }
    })
    res.send({
      code: 200,
      msg: 'ok'
    })
  }
}
