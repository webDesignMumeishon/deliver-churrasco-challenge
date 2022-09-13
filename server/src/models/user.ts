import mongoose, { Schema } from "mongoose";
import IUser from '../types/user'
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema<IUser>({
   _id : {
    required: false, 
    type: Schema.Types.ObjectId
  },
  username: {
    type: String, 
    required: true, 
    unique: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  active: {
    type: Boolean, 
    default: true
  },
  role: {type: String, enum: ['admin', 'customer']},
  lastLogin: Date, //work on this
  firstName: String,
  lastName: String,
  birthday: Date
});

userSchema.methods.generateAuthToken = function () {
  const JWT_KEY = process.env.JWT_SECRET_KEY || 'SUPER_SECRET_KEY';
  const token = jwt.sign({id: this._id}, JWT_KEY, { expiresIn: '7d' })
  return token
}

export const User = mongoose.model('User', userSchema);