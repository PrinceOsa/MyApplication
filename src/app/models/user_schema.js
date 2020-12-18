const mongoose = require("mongoose")
const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
        }

    }, { collection: 'user_data'})

    module.exports = mongoose.model('user_data', user_schema)
