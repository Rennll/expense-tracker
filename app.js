const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require('./routes/')

const PORT = 3000

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`This website is running on http://localhost:${PORT}`)
})
