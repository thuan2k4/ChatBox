const mongoose = require('mongoose')
require('dotenv').config()

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI)
    } catch (error) {
        console.log("Connection is error")
    }
}

module.exports = connectToMongoDB