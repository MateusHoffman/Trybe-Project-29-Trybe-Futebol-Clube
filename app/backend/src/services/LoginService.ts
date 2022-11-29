import generateToken from '../utils/JWT';
import User from '../database/models/Users';

export default class LoginService {
  public post = async (infoPost: any): Promise<any> => {
    const { email } = infoPost;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { status: 401, response: { message: 'Incorrect email or password' } };
    }
    const token = generateToken({
      id: user.id, username: user.username, role: user.role, email: user.email,
    });
    return { status: 201, response: { token } };
  };
}
