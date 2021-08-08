const express = require('express')
const router = express.Router()
const Utils = require('../utils')
const Topic = require('../models/Topic')
const path = require('path')

// GET - all topic -------------------------------------------------------
router.get('/',  (req, res) => {
    Topic.find()
    .then(topic => {
        if(topic == null){
            return res.status(404).json({
                message: "No topics found"
            })
        }
        res.json(topic)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Problem getting topics"
        })
    })
})

// GET - get single topic -------------------------------------------------------
router.get('/:id', (req, res) => {
/*if(req.Topic._id != req.params.id){
return res.status(401).json({
message: "Not authorised"
})
}*/
    Topic.findById(req.params.id)
    .then(topic => {
        res.json(topic)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Couldn't get topic",
            error: err
        })
    })
})

// PUT - update topic ---------------------------------------------

router.put('/:id', Utils.authenticateToken, (req, res) => {
// validate request
    if(!req.body) return res.status(400).send("Task content can't be empty")
    let imageFilename = null
    // if image image exists, upload!
    if(req.files && req.files.image){
        // upload image then update topic
        let uploadPath = path.join(__dirname, '..', 'public', 'images')
        Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {
            imageFilename = uniqueFilename
            // update topic with all fields including image
            updateTopic({
                topicName: req.body.topicName,
                topicDescription: req.body.topicDescription,
                topicIcon: imageFilename
            })
        })
    }else{
        // update topic without image
        updateTopic(req.body)
    }
    
    // update topic
    function updateTopic(update){
        Topic.findByIdAndUpdate(req.params.id, update, {new: true})
        .then(topic => res.json(topic))
        .catch(err => {
            res.status(500).json({
                message: 'Problem updating topic',
                error: err
            })
        })
    }
})

// POST - create new topic --------------------------------------
router.post('/', Utils.authenticateToken, (req, res) => {
    console.log("Creating a new topic")
    // validate request
    if(Object.keys(req.body).length === 0){
        return res.status(400).send({message: "Topic content can not be empty"})
    }

    // validate - check if image file exist
    /*if(!req.files || !req.files.image){
        return res.status(400).send({message: "Image can't be empty"})
    }
    // upload image then update topic
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    console.log(uploadPath)
    Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {
        imageFilename = uniqueFilename*/
        // update topic with all fields including image
        let newTopic = new Topic({
            topicName: req.body.topicName,
            topicDescription: req.body.topicDescription,
            //topicIcon: imageFilename
        })
        newTopic.save()
        .then(topic => {
            // success!
            // return 201 status with topic object
            return res.status(201).json(topic)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({
                message: "Problem creating Topic",
                error: err
            })
        })
   // })
})
module.exports = router