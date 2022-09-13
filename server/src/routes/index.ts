import { Express } from 'express';

import userRouter from './user';
import loginRouter from './login'
import productRouter from './product'


export default (app: Express) => {
  app.use('/user', userRouter)
  app.use('/login', loginRouter)
  app.use('/product', productRouter)
}
