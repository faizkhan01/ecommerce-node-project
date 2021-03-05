const mongoose = require('mongoose');

// define products Schema
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        index: true,
      },
      category: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      }
})
const productsModel = mongoose.model('products', productsSchema);
module.exports=productsModel;