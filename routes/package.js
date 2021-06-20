const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Package = require('../models/Package')
const path = require('path')

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
    // upload avater image then update package
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {
      imageFilename = uniqueFilename
      // update package with all fields including image
      updateUser({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        duration: req.body.duration,
        country: req.body.country,
        image: imageFilename,
        price: req.body.price
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

    // create new package       
    let newPackage = new Package(req.body)
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

module.exports = router