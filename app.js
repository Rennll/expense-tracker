const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
  res.send('This is a expense tracker.')
})

app.listen(PORT, (req, res) => {
  console.log(`This website is running on http://localhost:${PORT}`)
})
