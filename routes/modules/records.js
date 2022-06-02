const express = require('express')
const router = express()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('edit', { categories }))
})

router.post('/new', async (req, res) => {
  const { name, date, amount, categoryId } = req.body

  try {
    const category = await Category.findOne({ id: parseInt(categoryId) })
    const lastRecord = await Record.find().sort({ id: -1 }).limit(1)
    const id = lastRecord[0].id
    await Record.create({
      id: id + 1,
      name,
      date,
      amount,
      categoryId: category._id
    })
  } catch {
    const category = await Category.findOne({ id: parseInt(categoryId) })
    await Record.create({
      id: 1,
      name,
      date,
      amount,
      categoryId: category._id
    })
  } finally {
    res.redirect('/')
  }
})

module.exports = router
