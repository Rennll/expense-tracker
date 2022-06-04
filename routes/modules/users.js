const express = require('express')
const router = express()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body
  const repeatedEmail = await User.find({ email })

  if (repeatedEmail.length) {
    return res.render('register', { name, email, password, confirmedPassword })
  }
  if (password !== confirmedPassword) {
    return res.render('register', { name, email, password, confirmedPassword })
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

module.exports = router
