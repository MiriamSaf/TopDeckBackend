const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Tradie = require('./../models/Tradie')

// GET- get all tradies ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Tradie.find()//.populate('user', '_id firstName lastName')
    .then(tradies => {
      if(tradies == null){
        return res.status(404).json({
          message: "No tradies found"
        })
      }
      res.json(tradies)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting tradies"
      })
    })  
})

// export
module.exports = router