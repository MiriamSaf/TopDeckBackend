
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
    type: String,
    required: true    
  },
  longDescription: {
    type: String,
    required: true    
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  vibe: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true    
  },
  region: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  image: {
    type: String,  
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type :Boolean,
    default: true
  },
  depatureLocation:{
    type: String,
    required: true
  },
  endLocation:{
    type: String,
    required: true
  }
}, { timestamps: true })


// model
const packageModel = mongoose.model('Package', packageSchema)

// export
module.exports = packageModel

