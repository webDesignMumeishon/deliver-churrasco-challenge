import jwt, {JwtPayload} from 'jsonwebtoken';


const JWT_KEY = process.env.JWT_SECRET_KEY || 'SUPER_SECRET_KEY';

export const signJWT = (payload: any) => jwt.sign(payload, JWT_KEY, { expiresIn: '7d' })

export const decodeJWT = (token: string): JwtPayload => {
  return jwt.verify(token.replace(/['"]+/g, ''), JWT_KEY) as JwtPayload
}
