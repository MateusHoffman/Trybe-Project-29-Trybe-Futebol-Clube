import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'senhasecreta';

const generateToken = (infoToSave: any) => {
  const token = sign(infoToSave, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

// const authenticateToken = (token) => {
//   if (!token) throw { status: 401, message: 'Missing token' };

//   try {
//     const validateToken = jwt.verify(token, TOKEN_SECREAT_KEY);
//     return validateToken;
//   } catch (error) {
//     throw { status: 401, message: 'JWT malformed' };
//   }
// };

export default generateToken;
