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
router.get('/getCity/:name', async (req, res) => {
    try{
        const searchStr = req.params.name
        const regex = new RegExp(`^${searchStr}`, "i")
        const data = await mongo_model.find({name: { $regex: regex }}).sort({ name: 1 })
        console.log(data)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router