const express = require('express')

const home = require('./modules/home')
const records = require('./modules/records')

const router = express()
router.use('/records', records)
router.use('/', home)

module.exports = router
