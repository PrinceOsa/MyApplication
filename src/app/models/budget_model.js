const mongoose = require("mongoose");


const budget_model = new mongoose.Schema({
    Title: {
        type: String,
    },
    budget:{
        type: Number,

    },
    color:{
        type: String,

    }
}, {collection: 'budget_data'});

module.exports = mongoose.model('budget_data', budget_model);
