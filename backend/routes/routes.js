const express = require('express')
const router = express.Router()
module.exports = router

router.get('/getAll', (req, res) => {
    res.send('Get all API')
})
router.get('/getID/:id', (req, res) => {
    res.send(req.params.id)
})