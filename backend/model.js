const mongoose = require('mongoose')
const { Schema, model } = mongoose

const citySchema = new Schema({
    id: {
        required: "true",
        type: "Number"
    },
    name: {
        required: "true",
        type: "String"
    },
    state: {
        required: "false",
        type: "String"
    },
    country: {
        required: "true",
        type: "String"
    },
    coord: {
        lon: {
            required: "true",
            type: "Decimal128"
        },
        lat: {
            required: "true",
            type: "Decimal128"
        }
    }
})

module.exports = model('City', citySchema)