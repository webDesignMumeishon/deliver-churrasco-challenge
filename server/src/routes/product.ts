import { upload } from '../services/upload';
import express from 'express';
import { getProducts, createProduct } from '../controllers/product';
import { checkUserAccess } from '../middlewares/checkUserAccess';


const router = express.Router()

router
  .get('/' ,[checkUserAccess], getProducts)
  .post('/', [checkUserAccess, upload.array('image')] , createProduct)

export default router
  