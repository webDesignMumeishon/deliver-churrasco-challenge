import crypto from 'crypto';

export const encrypt = (password : string) => {
  const hashedPassword = crypto.createHash('sha256').update(password).digest();
  return hashedPassword.toString('hex')
}

export const compare = ( plainPassword: string, hashedPassword: string ) => {
  const hashedEnteredPassword = crypto.createHash('sha256').update(plainPassword).digest();
  return hashedEnteredPassword.toString('hex') === hashedPassword
}
