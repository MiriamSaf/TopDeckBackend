
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const tradieSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  price: {
    type: Number,
    
  },
  user: {
    type: Schema.Types.ObjectId,
    
    ref: 'User'
  },
  profileImage: {
    type: String,
      
  },
  tradieType: {
    type: String,
    required: true
  }
  
}, { timestamps: true })


// model
const tradieModel = mongoose.model('Tradie', tradieSchema)

// export
module.exports = tradieModel

