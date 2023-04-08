const mongoose = require('mongoose')
const { Schema, model } = mongoose

const citySchema = new Schema({
    name: "String",
    state: "String",
    country: "String",
    coord: {
        lon: "Decimal128",
        lat: "Decimal128"
    }
})

module.exports = model('city', citySchema, 'cities_list')