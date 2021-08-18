const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const User = require('../models/User')
const path = require('path')

// PUT - add bookingsPackage --------------------------------------
router.put('/addBookingsPackage/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.packageId){
    return res.status(400).json({
      message: "No booking specified"
    })
  }
  // add packageId to bookings field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $push: {
      bookings: req.body.packageId
    }
  })
    .then((user) => {            
      res.json({
        message: "Package added to bookings"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding bookings package"
      })
    })
})


// PUT - remove bookingsPackage --------------------------------------
router.put('/removeBookingsPackage/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.packageId){
    return res.status(400).json({
      message: "No booking specified"
    })
  }
  // remove packageId from bookings field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $pull: {
      bookings: req.body.packageId
    }
  })
    .then((user) => {            
      res.json({
        message: "Package removed from bookings"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem removing bookings package"
      })
    })
})


// PUT - add favouritePackage --------------------------------------
router.put('/addFavPackage/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.packageId){
    return res.status(400).json({
      message: "No Package specified"
    })
  }
  // add packageId to favourites field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $push: {
      favourites: req.body.packageId
    }
  })
    .then((user) => {            
      res.json({
        message: "Package added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding favourite package"
      })
    })
})


// put - remove favouritePackage --------------------------------------
router.put('/removeFavPackage/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.packageId){
    return res.status(400).json({
      message: "No Package specified"
    })
  }
  // remove packageId from favourites field (array - pull)
  User.updateOne({
    _id: req.user._id
  }, {
    $pull: {
      favourites: req.body.packageId
    }
  })
    .then((user) => {            
      res.json({
        message: "Package removed from favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem removing favourite package"
      })
    })
})






// GET - get single user -------------------------------------------------------
router.get('/:id', Utils.authenticateToken, (req, res) => {
  if(req.user._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }

  User.findById(req.params.id).populate('favourites').populate('bookings')
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't get user",
        error: err
      })
    })

    
})


// PUT - update user ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Task content can't be empty")
  
  let avatarFilename = null

  // if avatar image exists, upload!
  if(req.files && req.files.avatar){
    // upload avater image then update user
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.avatar, uploadPath, (uniqueFilename) => {
      avatarFilename = uniqueFilename
      // update user with all fields including avatar
      updateUser({
        /*firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,*/
        avatar: avatarFilename
        //accessLevel not required
        //accessLevel: req.body.accessLevel
      })
    })
  }else{
    // update user without avatar
    updateUser(req.body)
  }
  
  // update User
  function updateUser(update){    
    User.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(user => res.json(user))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating user',
        error: err
      })
    }) 
  }
})

// POST - create new user --------------------------------------
router.post('/', (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "User content can not be empty"})
  }

  // check account with email doen't already exist
  User.findOne({email: req.body.email})
  .then(user => {
    if( user != null ){
      return res.status(400).json({
        message: "email already in use, use different email address"
      })
    }
  // create new user       
  let newUser = new User(req.body)
  newUser.save()
    .then(user => {        
      // success!  
      // return 201 status with user object
      return res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating account",
        error: err
      })
    })
  })
})
 


module.exports = router