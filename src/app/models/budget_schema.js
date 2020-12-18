const mongoose = require("mongoose");


const budget_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget:{
        type: Number,
        required: true

    },
    color:{
        type: String,
        required: true,
        minlength: 6
    },
    username:{
      type: String,
      required: true
  }
}, {collection: 'budget_data'});

module.exports = mongoose.model('budget_data', budget_schema);
