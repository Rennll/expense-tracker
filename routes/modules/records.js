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
  const category = await Category.findOne({ id: parseInt(categoryId) })
  let id = 0

  const lastRecord = await Record.find().sort({ id: -1 }).limit(1)
  if (lastRecord.length) id = lastRecord[0].id
  await Record.create({
    id: id + 1,
    name,
    date,
    amount,
    categoryId: category._id
  })
  res.redirect('/')
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const record = await Record.findOne({ _id }).lean()
  const categories = await Category.find().lean()
  const category = categories.find(category => category._id.equals(record.categoryId))

  let date = record.date.getFullYear() + '-'
  if (record.date.getMonth() < 10) date += '0'
  date += record.date.getMonth() + 1 + '-'
  if (record.date.getDate() < 10) date += '0'
  date += record.date.getDate()

  res.render('edit', { record, category, categories, date })
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const { name, date, amount, categoryId } = req.body
  const category = await Category.findOne({ id: parseInt(categoryId) })

  await Record.findOneAndUpdate({ _id }, {
    name,
    date,
    amount,
    categoryId: category._id
  }, { useFindAndModify: false }, res.redirect('/'))
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id

  await Record.findOneAndDelete({ _id }, { useFindAndModify: false }, res.redirect('/'))
})

module.exports = router
