const express = require('express')
const router = express.Router()
const Utils = require('../utils')
//const Topic = require('../models/Search')
const path = require('path')

router.get('/:searchFor', (req, res) => {   
    console.log(req.params.searchFor);

    Tour.find({name: { $regex: req.params.searchFor }})
      .then(tours => {
        console.log(tours)
        return res.json(tours)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
          message: "Problem getting tours"
        })
      })
  })

module.exports = router