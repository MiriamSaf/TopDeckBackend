const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Response = require('../models/Response')
const path = require('path')

// GET - all response -------------------------------------------------------
router.get('/',  (req, res) => {
  Response.find().populate('thread').populate('user','_id firstName accessLevel userScore avatar userScreenName')
  .then(response => {
    if(response == null){
      return res.status(404).json({
        message: "No responses found"
      })
    }
    res.json(response)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Problem getting responses"
    })
  })
})


// GET - get single response -------------------------------------------------------
router.get('/:id', /*Utils.authenticateToken,*/ (req, res) => {
  /*if(req.response._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }*/

  Response.findById(req.params.id).populate('thread').populate('user','_id firstName accessLevel userScore avatar userScreenName')
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't get response",
        error: err
      })
    })
})


// PUT - update response ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Response content can't be empty")
  
  // update Response 
  updateResponse(req.body)
  
  // update Response
  function updateResponse(update){    
    Response.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(response => res.json(response))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating response',
        error: err
      })
    }) 
  }
})

// POST - create new response --------------------------------------
router.post('/', (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Response content can not be empty"})
  }
  // create new response       
  let newResponse = new Response(req.body)
  newResponse.save()
    .then(response => {        
      // success!  
      // return 201 status with response object
      return res.status(201).json(response)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating response",
        error: err
      })
    })
})


// GET by thread _id

router.get('/byThreadId/:searchFor', (req, res) => {   
  console.log(req.params.searchFor);
  Response.find({thread:{_id:req.params.searchFor }}).populate('thread').populate('user','_id firstName accessLevel userScore avatar userScreenName')
    .then(tours => {
      console.log(tours)
      return res.json(tours)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        message: "Problem Getting Tour"
      })
    })
})


module.exports = router