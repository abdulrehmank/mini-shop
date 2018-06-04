import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    childCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    ancestors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);