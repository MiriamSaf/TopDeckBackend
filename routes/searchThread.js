const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Thread = require('../models/Thread')
const path = require('path')


// Get threads by topic _id
router.get('/:searchFor', (req, res) => {   
    console.log(req.params.searchFor);
    Thread.find({topic:  {_id:req.params.searchFor }}).populate('topic').populate('user')
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