import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();

  async getAll(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._leaderboardService.getAllHomeAway();
    res.status(status).json(response);
  }

  async getAllLeaderboardHome(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._leaderboardService.getAllLeaderboard('homeTeam');
    res.status(status).json(response);
  }

  async getAllLeaderboardAway(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._leaderboardService.getAllLeaderboard('awayTeam');
    res.status(status).json(response);
  }
}
