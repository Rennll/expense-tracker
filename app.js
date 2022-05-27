const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, (req, res) => {
  console.log(`This website is running on http://localhost:${PORT}`)
})
