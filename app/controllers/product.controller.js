import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

// Create and Save a new Product
exports.create = (req, res) => {
    console.log("req.body",req.body);
    if(!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).send({
            message: "Product name, description and price are mandatory"
        });
    }
    
    if(req.body.categories && !(req.body.categories instanceof Array)) {
        return res.status(400).send({
            message: "Categories should be passed in an array"
        });
    }
    let categoryIDs = req.body.categories;
    if(categoryIDs && categoryIDs.length > 0) {
        Category.find({_id: {$in: categoryIDs}})
        .then(categories => {
            for(var i in categories){
                for(let j = 0; j < categories[i].ancestors.length; j++){
                    if(categoryIDs.indexOf(categories[i].ancestors[j]) === -1) {
                        categoryIDs.push(categories[i].ancestors[j]);
                    }
                }
            }

            // Create a Product
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categories: categoryIDs || []
            });

            // Save Product in the database
            product.save()
            .then(data => {
                console.log("Product saved", data);
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Product."
                });
            });
        })
    }
    else {
        // Create a Product
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categories: []
        });

        // Save Product in the database
        product.save()
        .then(data => {
            console.log("Product saved", data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
    }
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

// Retrieve and return all products by category from the database.
exports.findAllByCategory = (req, res) => {
    Product.find({categories:req.params.categoryId})
    .sort('-updatedAt')
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product)
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    })
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).send({
            message: "Product name, description and price are mandatory"
        });
    }
    
    if(req.body.categories && !(req.body.categories instanceof Array)) {
        return res.status(400).send({
            message: "Categories should be passed in an array"
        });
    }

    let categoryIDs = req.body.categories;
    if(categoryIDs && categoryIDs.length > 0) {
        Category.find({_id: {$in: categoryIDs}})
        .then(categories => {
            for(var i in categories){
                for(let j = 0; j < categories[i].ancestors.length; j++){
                    if(categoryIDs.indexOf(categories[i].ancestors[j]) === -1) {
                        categoryIDs.push(categories[i].ancestors[j]);
                    }
                }
            }

            // Find product and update it with the request body
            Product.findByIdAndUpdate(req.params.productId, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categories: req.body.categories || []
            }, {new: true})
            .then(product => {
                if(!product) {
                    return res.status(404).send({
                        message: "Product not found with id " + req.params.productId
                    });
                }
                res.send(product);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Product not found with id " + req.params.productId
                    });                
                }
                return res.status(500).send({
                    message: "Error updating product with id " + req.params.productId
                });
            });
        });
    }
    else {
        // Find product and update it with the request body
        Product.findByIdAndUpdate(req.params.productId, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            categories: []
        }, {new: true})
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });                
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.productId
            });
        });
    }

};

// Delete a Product with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });

};
