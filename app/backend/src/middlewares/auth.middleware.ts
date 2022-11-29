// const { authentacateToken } = '../utils/JWT';

// const auth = async (req, res, next) => {
//   const { authorization } = req.headers;
//   const user = await authentacateToken(authorization);
//   if (!user) throw { status: 401, message: 'JWT malformed' };
//   req.locals.user = user;
//   next();
// };

// module.exports = { auth };
