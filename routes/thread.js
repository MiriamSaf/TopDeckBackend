const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Thread = require('../models/Thread')
const path = require('path')

// GET - all thread -------------------------------------------------------
router.get('/',  (req, res) => {
  Thread.find().populate('topic').populate('user')
  .then(thread => {
    if(thread == null){
      return res.status(404).json({
        message: "No threads found"
      })
    }
    res.json(thread)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Problem getting threads"
    })
  })
})


// GET - get single thread -------------------------------------------------------
router.get('/:id', Utils.authenticateToken, (req, res) => {
  if(req.thread._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }

  Thread.findById(req.params.id).populate('favourites')
    .populate('bookings')
    .then(thread => {
      res.json(thread)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't get thread",
        error: err
      })
    })
})


// PUT - update thread ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Thread content can't be empty")
  
  // update Thread 
  updateThread(req.body)
  
  // update Thread
  function updateThread(update){    
    Thread.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(thread => res.json(thread))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating thread',
        error: err
      })
    }) 
  }
})

// POST - create new thread --------------------------------------
router.post('/', Utils.authenticateToken, (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Thread content can not be empty"})
  }
  // create new thread       
  let newThread = new Thread(req.body)
  newThread.save()
    .then(thread => {        
      // success!  
      // return 201 status with thread object
      return res.status(201).json(thread)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating thread",
        error: err
      })
    })
})

module.exports = router