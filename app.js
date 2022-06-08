const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

require('./config/mongoose')
const routes = require('./routes/')
const usePassport = require('./config/passport')

const PORT = 3000

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`This website is running on http://localhost:${PORT}`)
})
