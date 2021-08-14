
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')

// schema
const responseSchema = new mongoose.Schema({
  responseText: {
    type: String,
    required: true
  },
  quote: {
    type : String
  },
  thread: [
      { type: Schema.ObjectId, ref: 'Thread' }
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
const responseModel = mongoose.model('Response', responseSchema)

// export
module.exports = responseModel

