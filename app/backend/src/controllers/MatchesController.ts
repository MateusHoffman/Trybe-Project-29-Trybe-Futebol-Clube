import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._matchesService.getAllMatches();
    res.status(status).json(response);
  }
}
