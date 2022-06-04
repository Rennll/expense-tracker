const express = require('express')
const router = express()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const filteredCategory = categories.find(category => category.id === parseInt(req.query.category))
  const records = []
  if (filteredCategory) {
    records.push(...await Record.find({ categoryId: filteredCategory._id }).lean())
  } else {
    records.push(...await Record.find().lean())
  }
  let totalAmount = 0

  records.forEach(record => {
    categories.forEach(category => {
      if (record.categoryId.equals(category._id)) {
        const iconImg = 'fa-' + category.icon.split('/').slice(-1)[0].replace('?style=', ' fa-')
        Object.assign(record, { icon: iconImg })
      }
    })

    let date = record.date.getFullYear() + '-'
    if (record.date.getMonth() < 10) date += '0'
    date += record.date.getMonth() + 1 + '-'
    if (record.date.getDate() < 10) date += '0'
    date += record.date.getDate()
    record.date = date

    totalAmount += record.amount
  })
  res.render('index', { categories, records, totalAmount })
})

module.exports = router
