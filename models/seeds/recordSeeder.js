if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')

const records = [{
  id: 1,
  name: '午餐',
  date: new Date(2019, 3, 23),
  amount: 60,
  userId: 1,
  categoryId: 4
}, {
  id: 2,
  name: '晚餐',
  date: new Date(2019, 3, 23),
  amount: 60,
  userId: 1,
  categoryId: 4
}, {
  id: 3,
  name: '捷運',
  date: new Date(2019, 3, 23),
  amount: 120,
  userId: 1,
  categoryId: 2
}, {
  id: 4,
  name: '電影：驚奇隊長',
  date: new Date(2019, 3, 23),
  amount: 220,
  userId: 2,
  categoryId: 3
}, {
  id: 5,
  name: '租金',
  date: new Date(2015, 3, 1),
  amount: 25000,
  userId: 1,
  categoryId: 1
}]

const users = [{
  id: 1,
  name: '廣志',
  email: 'test1@example.com',
  password: 'test'
}, {
  id: 2,
  name: '小新',
  email: 'test2@example.com',
  password: 'test'
}]

db.once('open', async () => {
  const categories = await Category.find().lean()
  users.forEach(async (user) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const userRecord = records.filter(record => record.userId === user.id)

    await User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: hash
    })
      .then(user => {
        return Promise.all(Array.from(userRecord,
          record => {
            record.userId = user._id
            categories.forEach(category => {
              if (category.id === record.categoryId) {
                record.categoryId = category._id
              }
            })
            return Record.create(record)
          }))
      })
      .then(() => {
        console.log('Done.')
        process.exit()
      })
      .catch(err => console.log(err))
  })
})
