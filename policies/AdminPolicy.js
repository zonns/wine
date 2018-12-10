module.exports = {
  isLogin (req, res, next) {
    if (req.session.isLogin) {
      next()
    } else {
      res.redirect('/admin/login')
    }
  }
}
