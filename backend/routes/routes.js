const express = require('express')
const { Model } = require('mongoose')
const mongoModel = require('../model')
const router = express.Router()

router.get('/getAll', async (req, res) => {
    try{
        const data = await mongoModel.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/getID/:id', async (req, res) => {
    try{
        const data = await mongoModel.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router