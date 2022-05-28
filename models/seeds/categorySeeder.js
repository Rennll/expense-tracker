const mongoose = require('mongoose')
const Category = require('../category')

const CATEGORY = {
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid'
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', async () => {
  console.log('MongoDB is connected.')

  let id = 1
  for (const [key, value] of Object.entries(CATEGORY)) {
    await Category.create({ id: id, name: key, icon: value })
    id++
  }
  console.log('Done.')
})
