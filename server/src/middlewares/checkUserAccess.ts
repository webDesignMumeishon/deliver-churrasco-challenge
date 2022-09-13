import { NextFunction, Request, Response } from "express";
import moment from 'moment'

import CustomError from '../utils/errorHandler'
import { decodeJWT } from '../utils'
import {checkUserById} from '../services/user'


export const checkUserAccess = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const getCookieValue = req.headers.cookie

    const cookies = getCookieValue.split('=')[1]
    if (!cookies) {
      throw new CustomError('Unauthorized', 401)
    }
    const payload = decodeJWT(cookies)
    if (payload.exp && payload.exp <= Number(moment.now().toString().slice(0, 10))) {
      throw new CustomError('Expired token.', 401)
    }
    const userInstanceChecked = await checkUserById(payload.id)
    if(userInstanceChecked === null){
      throw new CustomError('User not found', 401)
    }
    req.user = {
      id: userInstanceChecked.id,
    }
  } catch (e) {
    next(e)
  }

  next()
}
