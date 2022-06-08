const express = require('express')
const passport = require('passport')
const User = require('../../models/user')

const router = express()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body
  const repeatedEmail = await User.find({ email })
  const errors = []

  if (repeatedEmail.length) {
    errors.push({ message: 'Email already registered.' })
  }
  if (password !== confirmedPassword) {
    errors.push({ message: 'Password and confirm password does not match.' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmedPassword, errors })
  }

  let id = 0
  const lastRecord = await User.find().sort({ id: -1 }).limit(1)
  if (lastRecord.length) id = lastRecord[0].id

  await User.create({
    id: id + 1,
    name,
    email,
    password
  })
  res.redirect('/users/login')
})

router.get('/logout', (req, res) => {
  req.flash('success_msg', '已成功登出')
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
