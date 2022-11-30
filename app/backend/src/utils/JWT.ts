// import { Jwt, sign, verify } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (infoToSave: any) => {
  const token = jwt.sign(infoToSave, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

const validateToken = (token: any) => {
  try {
    const validation = jwt.verify(token, JWT_SECRET);
    return validation as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
};

export { generateToken, validateToken };
