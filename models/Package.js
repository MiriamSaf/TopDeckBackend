
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')

// schema
const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  country: {
    type: String    
  },
  image: {
    type: String    
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true })


// model
const packageModel = mongoose.model('Package', packageSchema)

// export
module.exports = packageModel

