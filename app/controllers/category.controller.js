import Category from '../models/category.model.js';

// Create and Save a new Category
exports.create = (req, res) => {
    console.log("req.body",req.body);
    if(!req.body.name || !req.body.slug) {
        return res.status(400).send({
            message: "Category name and slug can not be empty"
        });
    }

    // Create a Category
    const category = new Category({
        name: req.body.name,
        slug: req.body.slug,
        parentCategory: req.body.parentCategory || null
    });

    // Save Category in the database
    category.save()
    .then(data => {

        if(data.parentCategory) {
            Category.findOne({ _id:data.parentCategory}).then(parentCategory => {
                console.log("parentCategory.childCategories", parentCategory.childCategories.indexOf(data._id));
                parentCategory.childCategories.push(data._id);
                parentCategory.save().then(cat=> {
                    let parentAncestors = parentCategory.ancestors;
                    let ancestors = [ parentCategory.id, ...parentAncestors ];
                    console.log("ancestors",ancestors);
                    Category.findByIdAndUpdate(data._id, {
                        ancestors: ancestors
                    }).then(data=>{    
                        res.send(data);
                    })
                })
                
            })
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Category."
        });
    });

};

// Retrieve and return all Categories from the database.
exports.findAll = (req, res) => {
    let responseCategories = [];
    Category.find()
    .populate({
        path: 'childCategories',
        populate: {
            path: 'childCategories',
            populate:{
                path: 'childCategories',
                populate:{
                    path: 'childCategories',
                }
            }
        }
    })
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Categories."
        });
    });
};

// Find a single Category with a CategorId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId).then(category => {
        res.send(category)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    })

};

// Update a Category identified by the CategoryId in the request
exports.update = (req, res) => {

};

// Delete a Category with the specified CategoryId in the request
exports.delete = (req, res) => {

}