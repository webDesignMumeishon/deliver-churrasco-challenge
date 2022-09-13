import { HydratedDocument } from 'mongoose';
import { encrypt } from "../utils";

import { User as UserSchema } from "../models/user";
import  IUser  from "../types/user";

export const getUserByLogin = async (login : string) => {
    const user = await UserSchema.findOneAndUpdate(
        {
            $or: [
                {email: login},
                {username: login}
            ]
        },
        {
            lastLogin: Date.now()
        }
    )
    return user
}


export const checkUserById = async (id : string) => {
    return await UserSchema.findById(id)
}

export const insertUser = async (user: IUser) => {
    const insertedUser : HydratedDocument<IUser> = new UserSchema({
        username: user.username,
        email: user.email,
        password: encrypt(user.password),
        role: user.role,
        active: user.active,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
    });
    await insertedUser.save();
}

