import { Request, Response } from 'express';

import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private _teamsService = new TeamsService();

  async getAllTeams(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._teamsService.getAllTeams();
    res.status(status).json(response);
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._teamsService.getTeamById(req.params.id);
    res.status(status).json(response);
  }
}
