import { Request, Response } from "express";
import Joi from 'joi';

import { getProductsDB, insertProductDB } from '../services/product'
import { uploadToCloudinary } from '../services/upload'
import Validator from '../utils/joi_validator'
import IProduct from "../types/products";
import { bufferToDataURI } from "../utils/file";
import CustomError from '../utils/errorHandler'


export const getProducts = async (req: Request, res: Response, next) => {

  try {
    return res.send({
      products: await getProductsDB()
    })
  } catch (e) {
    next(e)
  }
}

const postProductSchema = Joi.object()
  .keys({
    SKU: Joi.string().required(), // Allow a number up to 10000 but use the default past the allowable maximum
    name: Joi.string().required(),
    price: Joi.string().required(),
    currency: Joi.string().required(),
    code: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, '')
  })
  .required()
  .unknown(true);

export const createProduct = async (req: Request, res: Response, next: any) => {
  try {
    const productFields = req.body
    const { files } = req
    if (!files) {
      throw new CustomError('Images are required', 400)
    }

    const validator = new Validator<IProduct>(postProductSchema);
    if (!validator.validate(productFields)) {
      throw new CustomError(JSON.stringify(validator.getError().details), 400)
    }

    const fileFormat = files[0].mimetype.split('/')[1]
    const base64Values: string[] = []
    for (let i = 0; i < files.length; i++) {
      const { base64 } = bufferToDataURI(fileFormat, files[i].buffer)
      base64Values.push(base64)
    }
    const listOfUrls = await uploadToCloudinary(base64Values, fileFormat)
    const createdProduct = await insertProductDB(productFields, listOfUrls)
    return res.status(201).json(createdProduct)
  }
  catch (e) {
    next(e)
  }
}
