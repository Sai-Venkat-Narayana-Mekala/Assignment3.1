const chai = require('chai'); // Import chai for assertions
const chaiHttp = require('chai-http'); // Import chai-http to make HTTP requests
const app = require('./app'); // Import the app to be tested
const should = chai.should(); // Use should style assertions
const Item = require('./models/item'); // Import the Item model

chai.use(chaiHttp); // Use chai-http for making HTTP requests

describe('Items', () => {
    // Test to retrieve all items
    it('should retrieve all items on /items GET', (done) => {
        chai.request(app)
            .get('/items') // Make a GET request to /items
            .end((err, res) => {
                res.should.have.status(200); // Verify that the response status is 200
                res.body.should.be.a('array'); // Verify that the response body is an array
                done(); // End the test
            });
    });

    // Test to add a new item
    it('should add a new item on /items POST', (done) => {
        chai.request(app)
            .post('/items') // Make a POST request to /items
            .send({ 'name': 'Test Item', 'price': 10 }) // Send item data in the request body
            .end((err, res) => {
                res.should.have.status(201); // Verify that the response status is 201
                res.body.should.be.a('object'); // Verify that the response body is an object
                res.body.should.have.property('name'); // Verify that the response body has a name property
                res.body.should.have.property('price'); // Verify that the response body has a price property
                done(); // End the test
            });
    });

    // Test to retrieve a single item by ID
    it('should retrieve a single item on /items/:id GET', (done) => {
        let item = new Item({ name: 'Test Item', price: 10 }); // Create a new item instance
        item.save((err, item) => { // Save the item to the database
            chai.request(app)
                .get('/items/' + item.id) // Make a GET request to /items/:id
                .end((err, res) => {
                    res.should.have.status(200); // Verify that the response status is 200
                    res.body.should.be.a('object'); // Verify that the response body is an object
                    res.body.should.have.property('name'); // Verify that the response body has a name property
                    res.body.should.have.property('price'); // Verify that the response body has a price property
                    res.body.should.have.property('_id').eql(item.id); // Verify that the response body has the correct _id
                    done(); // End the test
                });
        });
    });

    // Test to update a single item by ID
    it('should update a single item on /items/:id PUT', (done) => {
        let item = new Item({ name: 'Test Item', price: 10 }); // Create a new item instance
        item.save((err, item) => { // Save the item to the database
            chai.request(app)
                .put('/items/' + item.id) // Make a PUT request to /items/:id
                .send({ 'name': 'Updated Test Item', 'price': 20 }) // Send updated item data in the request body
                .end((err, res) => {
                    res.should.have.status(200); // Verify that the response status is 200
                    res.body.should.be.a('object'); // Verify that the response body is an object
                    res.body.should.have.property('name').eql('Updated Test Item'); // Verify that the response body has the updated name property
                    res.body.should.have.property('price').eql(20); // Verify that the response body has the updated price property
                    done(); // End the test
                });
        });
    });

    // Test to delete a single item by ID
    it('should delete a single item on /items/:id DELETE', (done) => {
        let item = new Item({ name: 'Test Item', price: 10 }); // Create a new item instance
        item.save((err, item) => { // Save the item to the database
            chai.request(app)
                .delete('/items/' + item.id) // Make a DELETE request to /items/:id
                .end((err, res) => {
                    res.should.have.status(200); // Verify that the response status is 200
                    res.body.should.be.a('object'); // Verify that the response body is an object
                    res.body.should.have.property('message').eql('Item successfully deleted'); // Verify that the response body has the success message
                    done(); // End the test
                });
        });
    });
});
