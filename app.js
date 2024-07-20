const express = require('express'); // Import express to set up the application
const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Import body-parser to handle JSON request bodies

const app = express(); // Initialize the express application
app.use(bodyParser.json()); // Configure body-parser to process JSON data

// Establish connection to MongoDB using the provided connection string
mongoose.connect('mongodb+srv://saivenkatnarayanamekala:saivenkatnarayana%402024@cluster0.fjadlsp.mongodb.net/newdb', {
    useNewUrlParser: true, // Use the new connection string parser
    useUnifiedTopology: true // Enable the new server discovery and monitoring engine
});

const Item = require('./models/item'); // Import the Item model

// Route to create a new item
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body); // Create a new item from the request data
    await newItem.save(); // Save the new item to the database
    res.status(201).send(newItem); // Respond with the newly created item
});

// Route to retrieve all items
app.get('/items', async (req, res) => {
    const items = await Item.find(); // Fetch all items from the database
    res.send(items); // Respond with the list of items
});

// Route to retrieve a single item by ID
app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id); // Fetch an item by its ID
    res.send(item); // Respond with the fetched item
});

// Route to update a single item by ID
app.put('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update an item by its ID
    res.send(item); // Respond with the updated item
});

// Route to delete a single item by ID
app.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndRemove(req.params.id); // Delete an item by its ID
    res.send({ message: 'Item successfully deleted' }); // Respond with a success message
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000'); // Log the server start message
});

// Export the app for testing purposes
module.exports = app;
