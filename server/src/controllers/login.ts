import { Request, Response } from "express";
import Joi from 'joi';
import { serialize } from "cookie";

import { getUserByLogin } from '../services/user'
import { compare } from "../utils/handleBcrypt";
import { Role } from '../enums/index'
import Validator from '../utils/joi_validator'
import CustomError from '../utils/errorHandler'

const postLoginSchema = Joi.object()
  .keys({
    login: Joi.string().required(), // Allow a number up to 10000 but use the default past the allowable maximum
    password: Joi.string().required(),
  })
  .required()
  .unknown(true);

interface LoginKeys {
  login: string;
  password: string;
}

export const login = async (req: Request, res: Response, next) => {

  try {
    const bodyFields = req.body
    const validator = new Validator<LoginKeys>(postLoginSchema);

    if (!validator.validate(bodyFields)) {
      return res.status(400).json(validator.getError().details);
    }

    let userInstance = await getUserByLogin(bodyFields.login)

    if (userInstance === null) {
      throw new CustomError('User not found', 403)
    }

    if (!compare(bodyFields.password, userInstance.password)) {
      throw new CustomError('Invalid password', 404)
    }

    isAdminAndIsActive(userInstance.role, userInstance.active)

    const token = userInstance.generateAuthToken();

    const serialised = serialize('OursiteJWT', token, {
      httpOnly: true,
    })

    res.setHeader('Set-Cookie', serialised)
    return res.status(202).json({ token })

  } catch (err) {
    next(err)
  }
}

export const logout = async (req: Request, res: Response, next) => {
  try {
    res.clearCookie("OursiteJWT");
    return res.status(200).json({ msg: "cookie deleted" })
  } catch (err) {
    next(err)
  }
}


const isAdminAndIsActive = (role: Role, active: boolean): void => {
  if (role !== Role.ADMIN || !active) {
    throw new CustomError('User is not an admin', 403)
  }
  if (!active) {
    throw new CustomError('User is not active', 403)
  }
}


