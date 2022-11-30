import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService = new MatchesService();

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const { status, response } = (!inProgress)
      ? await this._matchesService.getAllMatches()
      : await this._matchesService.getByProgress(String(inProgress));
    res.status(status).json(response);
  }

  async postMatches(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._matchesService.postMatches(req.body);
    res.status(status).json(response);
  }
}
