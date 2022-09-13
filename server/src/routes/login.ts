import express from 'express';
import { login, logout } from '../controllers/login';

const router = express.Router()

router
  .post('/', login)
  .delete('/logout', logout)


export default router
