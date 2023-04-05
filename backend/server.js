import mongoose from 'mongoose';
const express = require('express');
const app = express();

const { Schema, connect } = mongoose;
const username = process.env.REACT_APP_MONGO_DB_USERNAME
const password = process.env.REACT_APP_MONGO_DB_PASSWORD
const cluster = process.env.REACT_APP_MONGO_DB_CLUSTER
const cluster_test = process.env.REACT_APP_MONGO_DB_CLUSTER_TEST


const mongoURL = `mongodb+srv://${username}:${password}@${cluster_test}.mongodb.net`

const start = async() => {
    await mongoose.connect(mongoURL)
}
const citySchema = new Schema({
    id: "Number",
    name: "String",
    state: "String",
    country: "String",
    coord: {
        lon: "Decimal128",
        lat: "Decimal128"
    }

})


const connectDB = async() => {
    await mongoose.connect(mongoURL)
}
const cityDOC = mongoose.model('city_list', citySchema)