import { Product as ProductSchema } from "../models/products";
import IProduct from '../types/products'
import { HydratedDocument } from 'mongoose';

export const getProductsDB = async () => {
    return await ProductSchema.find({}, {_id: 0})
}

export const insertProductDB = async (product : IProduct, picturesUrls? : string[]) => {

    const insertedProduct : HydratedDocument<IProduct> = new ProductSchema({
        SKU: product.SKU,
        code: Number(product.code),
        name: product.name,
        description: product.name,
        pictures: picturesUrls,
        price: Number(product.price),
        currency: product.currency
    });

    await insertedProduct.save();
}


