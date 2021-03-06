const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')
require('mongoose-type-email')

// schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true    
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
    
  },
  accessLevel: {
    type: Number,
    default: 1
  },
  newUser: {
    type: Boolean,
    default: true
  },
  favourites: [
    { type: Schema.ObjectId, ref: 'Package' }
  ],
  bookings: [
    { type: Schema.ObjectId, ref: 'Package' }
  ],
  userPhone:{
    type: String
  },
  userScreenName:{
    type: String
  },
  userStreet:{
    type: String
  },
  userTown:{
    type: String
  },
  userState:{
    type: String
  },
  userCountry:{
    type: String
  },
  userPostCode:{
    type: String
  },
  userPassport:{
    type: String
  },
  userPassportExpiry:{
    type: String
  },
  emFirstName:{
    type: String
  },
  emLastName:{
    type: String
  },
  emRelationship:{
    type: String
  },
  emPhone:{
    type: String
  },
  emEmail:{
    type: String
  },
  emStreet:{
    type: String
  },
  emTown:{
    type: String
  },
  emState:{
    type: String
  },
  emCountry:{
    type: String
  },
  emPostCode:{
    type: String
  },
  userScore:{
    type: Number
  },
  userPayType :{
    type: String
  }
}, { timestamps: true })

// encrypt password field on save
userSchema.pre('save', function(next) {
  // check if password is present and is modifed  
  if( this.password && this.isModified() ){
      this.password = Utils.hashPassword(this.password);
  }
  next()
})

// model
const userModel = mongoose.model('User', userSchema)

// export
module.exports = userModel




