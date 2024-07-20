const mongoose = require('mongoose');

// Define a schema for an item
const ItemSchema = new mongoose.Schema({
    name: String, // Name of the item
    price: Number // Price of the item
});

// Create a model from the item schema
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
