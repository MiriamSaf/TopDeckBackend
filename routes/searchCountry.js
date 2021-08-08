const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Package = require('../models/Package')
const path = require('path')

router.get('/:searchFor', (req, res) => {   
    console.log(req.params.searchFor);

    Package.find({country: { $regex: req.params.searchFor }})
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