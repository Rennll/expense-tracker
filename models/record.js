const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.types.ObjectId,
    ref: 'category',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', RecordSchema)
