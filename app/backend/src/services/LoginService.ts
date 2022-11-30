import { compare } from 'bcryptjs';

import { generateToken, validateToken } from '../utils/JWT';
import Users from '../database/models/Users';

export default class LoginService {
  public post = async (infoPost: any) => {
    const { email } = infoPost;
    const user = await Users.findOne({ where: { email } });
    if (!user || !(await compare(infoPost.password, user.password))) {
      return { status: 401, response: { message: 'Incorrect email or password' } };
    }
    const token = generateToken({
      id: user.id, username: user.username, role: user.role, email: user.email,
    });
    return { status: 200, response: { token } };
  };

  public getRoleByToken = async (token: any) => {
    const userToken = validateToken(token);
    const login = userToken && await Users.findOne({ where: { email: userToken.email } });
    return { status: 200, response: login };
  };
}
