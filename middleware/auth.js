module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '需要登入後使用')
    res.redirect('/users/login')
  }
}
