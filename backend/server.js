require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const { Schema, connect } = mongoose;
const routes = require('./routes/routes')
const app = express();
app.use(express.json())

const mongoURL = process.env.MONGO_DB_URL

mongoose.connect(mongoURL)

mongoose.connection.on('error', err => {
    console.log("(!!!!!!!!!!!!!)" + err)
})

mongoose.connection.once('connected', () => {
    console.log('Database connected!!')
})

app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
})

app.use('/api', routes)
// const start = async() => {
//     await mongoose.connect(mongoURL, {
//         ssl: true,
//         sslValidate: false
//     })
// }
// const citySchema = new Schema({
//     id: "Number",
//     name: "String",
//     state: "String",
//     country: "String",
//     coord: {
//         lon: "Decimal128",
//         lat: "Decimal128"
//     }

// })
// start()
// const cityDOC = mongoose.model('city_list', citySchema)