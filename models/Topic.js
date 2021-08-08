
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')

// schema
const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true
  },
  topicDescription: {
    type: String,
    required: true    
  },
  topicIcon: {
    type: String,  
    required: true
  }
}, { timestamps: true })


// model
const topicModel = mongoose.model('Topic', topicSchema)

// export
module.exports = topicModel