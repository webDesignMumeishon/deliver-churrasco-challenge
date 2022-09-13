import { Request, Response } from "express";
import * as userService from "../services/user";

export const createUser = async (req: Request, res: Response, next) => {
  try {
    const user = req.body;
    const newUser = await userService.insertUser(user);
    res.status(201).send(newUser)
  } catch (e) {
    next(e)
  }
}

