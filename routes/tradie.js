const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Tradie = require('./../models/Tradie')
const path = require('path')

// GET- get all tradies ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Tradie.find().populate('user', '_id firstName lastName')
    .then(tradie => {
      if(tradie == null){
        return res.status(404).json({
          message: "No Tradie found"
        })
      }
      res.json(haircuts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting Tradies"
      })
    })  
})

// GET - get single Tradie -------------------------------------------------------
router.get('/:id', Utils.authenticateToken, (req, res) => {
  
  Tradie.findById(req.params.id).populate('favouriteHaircuts')
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

// GET - get single Tradie by Business Name -------------------------------------------------------
router.get('/customerID/:id', Utils.authenticateToken, (req, res) => {
  if(req.user._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }

  Tradie.find({user : user._id})
    .then(tradie => {

      res.json(tradie)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't get user",
        error: err
      })
    })
})

// PUT - update users Tradie page ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Task content can't be empty")
  
  let profileImageFilename = null

  // if profileImage exists, upload!
  if(req.files && req.files.profileImage){
    // upload avater image then update Tradie
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.profileImage, uploadPath, (uniqueFilename) => {
      profileImageFilename = uniqueFilename
      // update user with all fields including avatar
      updateTradie({
        businessName: req.body.businessName,
        description: req.body.description,
        price: req.body.price,
        user: req.body.user,
        profileImage: profileImageFilename,
        tradeType: req.body.tradeType
      })
    })
  }else{
    // update user without avatar

    updateTradie(req.body)
  }
  
  // update User
  function updateTradie(update){    
    Tradie.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(tradie => res.json(tradie))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating Tradie',
        error: err
      })
    }) 
  }
})

// POST - create new business --------------------------------------
router.post('/', (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "User content can not be empty"})
  }

  // check account with businessName doen't already exist
  Tradie.findOne({businessName: req.body.businessName})
  .then(tradie => {
    if( tradie != null ){
      return res.status(400).json({
        message: "Business Name already in use, use different Name"
      })
    }
  // create new Tradie       
  let newTradie = new Tradie(req.body)
  newTradie.save()
    .then(tradie => {        
      // success!  
      // return 201 status with user object
      //return tradie._id
      return res.status(200).json("Test This")
      //return res.status(201).json(tradie)
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

// export
module.exports = router