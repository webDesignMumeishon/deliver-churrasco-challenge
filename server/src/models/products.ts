import mongoose from "mongoose";
import IProduct from '../types/products'

const productSchema = new mongoose.Schema<IProduct>({
    code: Number,
    description: String,
    SKU: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    pictures: {type: [String], required: true},
    price: {type: Number, required: true},
    currency: {type: String, required: true}
});

export const Product = mongoose.model('Product', productSchema);