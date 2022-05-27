const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('MongoDB is connected.'))

const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/records/new', (req, res) => {
  res.render('edit')
})

app.listen(PORT, (req, res) => {
  console.log(`This website is running on http://localhost:${PORT}`)
})
