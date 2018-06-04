import mongoose from 'mongoose';
import Category from './category.model';

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
