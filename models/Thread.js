
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')

// schema
const threadSchema = new mongoose.Schema({
  threadName: {
    type: String,
    required: true
  },
  topic: [
      { type: Schema.ObjectId, ref: 'Topic' }
  ],
  user: [
    { type: Schema.ObjectId, ref: 'User' }
  ],
  userRead: {
    type: String
    // defult: false
  }
}, { timestamps: true })


// model
const threadModel = mongoose.model('Thread', threadSchema)

// export
module.exports = threadModel

