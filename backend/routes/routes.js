const express = require('express')
const mongo_model = require('../models')
const router = express.Router()

router.get('/getAll', async (req, res) => {
    try{
        const data = await mongo_model.find({}).exec()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/getID/:id', async (req, res) => {
    try{
        const data = await mongo_model.findOne({_id: req.params.id})
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router