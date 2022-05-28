const express = require('express')
const router = express()

router.get('/new', (req, res) => {
  res.render('edit')
})

module.exports = router
