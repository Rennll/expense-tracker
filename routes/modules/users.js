const express = require('express')
const router = express()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
