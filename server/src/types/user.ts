import {ObjectId} from 'mongoose'
import { Role } from '../enums/index'

export default interface IUser {
  _id?: ObjectId,
  username: string,
  email: string,
  password: string,
  lastLogin: Date,
  role: Role,
  active: boolean,
  firstName: string,
  lastName: string,
  birthday: Date
  generateAuthToken: () => string;
}

export interface UserContext {
  id: ObjectId,
}
