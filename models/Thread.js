
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')

// schema
const threadSchema = new mongoose.Schema({
  threadName: {
    type: String,
    required: true
  },
  user: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  topic: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Topic' 
  },
  userRead: {
    type: String
    // defult: false
  }
}, { timestamps: true })


// model
const threadModel = mongoose.model('Thread', threadSchema)

// export
module.exports = threadModel

