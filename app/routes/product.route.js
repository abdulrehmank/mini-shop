module.exports = (app) => {
    const product = require('../controllers/product.controller.js');

    // Create a new Note
    app.post('/product', product.create);

    // Retrieve all Notes
    app.get('/product', product.findAll);

    // Retrieve all Notes
    app.get('/product/category/:categoryId', product.findAllByCategory);

    // Retrieve a single Note with noteId
    app.get('/product/:productId', product.findOne);

    // Update a Note with noteId
    app.put('/product/:productId', product.update);

    // Delete a Note with noteId
    app.delete('/product/:productId', product.delete);
}
