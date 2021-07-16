const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Package = require('../models/Package')
const path = require('path')

// GET - all package -------------------------------------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Package.find()
    .then(package => {
      if(package == null){
        return res.status(404).json({
          message: "No packages found"
        })
      }
      res.json(package)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting packages"
      })
    })  
})


// GET - get single package -------------------------------------------------------
router.get('/:id', Utils.authenticateToken, (req, res) => {
  if(req.Package._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }

  Package.findById(req.params.id)
    .then(package => {
      res.json(package)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't get package",
        error: err
      })
    })
})


// PUT - update package ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Task content can't be empty")
  
  let imageFilename = null

  // if image image exists, upload!
  if(req.files && req.files.image){
    // upload image then update package
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {
      imageFilename = uniqueFilename
      // update package with all fields including image
      updatePackage({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        duration: req.body.duration,
        vibe: req.body.vibe,
        country: req.body.country,
        region: req.body.region,
        type: req.body.type,
        image: imageFilename,
        price: req.body.price,
        bookingStatus: req.body.bookingStatus,
        depatureLocation: req.body.depatureLocation,
        endLocation: req.body.endLocation
      })
    })
  }else{
    // update package without image
    updatePackage(req.body)
  }
  
  // update package
  function updatePackage(update){    
    Package.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(package => res.json(package))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating package',
        error: err
      })
    }) 
  }
})

// POST - create new package --------------------------------------
router.post('/', (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Package content can not be empty"})
  }
  
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }
  // upload image then update package
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  console.log(uploadPath)
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {
    imageFilename = uniqueFilename
    console.log(imageFilename)
    // update package with all fields including image
    let newPackage = new Package({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      duration: req.body.duration,
      vibe: req.body.vibe,
      country: req.body.country,
      region: req.body.region,
      type: req.body.type,
      image: imageFilename,
      price: req.body.price,
      bookingStatus: req.body.bookingStatus,
      depatureLocation: req.body.depatureLocation,
      endLocation: req.body.endLocation
    })
    newPackage.save()
      .then(Package => {        
      // success!  
      // return 201 status with package object
      return res.status(201).json(package)
      })
      .catch(err => {
      console.log(err)
      return res.status(500).send({
          message: "Problem creating Package",
          error: err
      })
    })
  })
})

module.exports = router