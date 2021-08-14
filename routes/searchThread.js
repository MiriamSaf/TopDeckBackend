const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Threads = require('../models/Threads')
const path = require('path')

router.get('/:searchFor', (req, res) => {   
    console.log(req.params.searchFor);
/*    Threads.find({topic: { $regex: req.params.searchFor }})
      .then(thread => {
        console.log(thread)
        return res.json(thread)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
          message: "Problem Getting Tour"
        })
      })*/
  })

module.exports = router