import { Request, Response } from 'express';

import LoginService from '../services/LoginService';

export default class LoginController {
  private _loginService = new LoginService();

  async post(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._loginService.post(req.body);
    res.status(status).json(response);
  }

  async getRoleByToken(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._loginService.getRoleByToken(req.headers.authorization);
    res.status(status).json(response);
  }
}
