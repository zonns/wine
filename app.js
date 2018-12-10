const express = require('express')
const config = require('./config/config')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const ueditor = require('ueditor')
const path = require('path')
const session = require('express-session')
const { sequelize } = require('./models/')
const fileUpload = require('./static/plugin/jquery-file-upload-middleware')

fileUpload.configure({
  uploadDir: path.join(__dirname, 'upload/wine'),
  uploadUrl: '/upload/wine'
})

const app = express()
app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/plugin', express.static('node_modules'))
app.use('/statics', express.static('static'))
app.use('/upload', express.static('upload'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(session({
  secret: 'secret'
}))
app.use('/fileUpload', fileUpload.fileHandler())

app.use('/statics/plugin/ueditor/ue', ueditor(path.join(__dirname, 'upload'), function (req, res, next) {
  var imgDir = '/img/ueditor/' // 默认上传地址为图片
  var ActionType = req.query.action
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
    var fileUrl = imgDir// 默认上传地址为图片
    /* 其他上传格式的地址 */
    if (ActionType === 'uploadfile') {
      fileUrl = '/file/ueditor/' // 附件保存地址
    }
    if (ActionType === 'uploadvideo') {
      fileUrl = '/video/ueditor/' // 视频保存地址
    }
    res.ue_up(fileUrl) // 你只要输入要保存的地址 。保存操作交给ueditor来做
    res.setHeader('Content-Type', 'text/html')
  } else if (ActionType === 'listimage') {
    res.ue_list(imgDir) // 客户端会列出 dir_url 目录下的所有图片
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.redirect('/statics/plugin/ueditor/ueditor.config.json')
  }
}))

require('./route')(app)

try {
  sequelize
    .sync()
    .then(app.listen(config.port, () => console.log(`Server has started on ${config.port}`)))
} catch (error) {
  console.log(error)
}
