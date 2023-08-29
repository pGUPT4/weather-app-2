require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const { connect, connection } = mongoose;
const routes = require('./routes/routes')
const app = express();
app.use(express.json())

const mongoURL = process.env.MONGO_DB_URL

// connect to databse {
connect(mongoURL)

connection.on('error', err => {
    console.log("(!!!!!!!!!!!!!)" + err)
})

connection.once('connected', () => {
    console.log('Database running :)')
})
// } connect to databse 

// create at http server at port:3000
app.listen(3000, () => {
    console.log(`Server at ${3000}`)
})

// router location - DOUBT
app.use('/api', routes)

