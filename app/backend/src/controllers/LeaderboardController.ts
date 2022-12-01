import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();

  async getAllLeaderboardSort(req: Request, res: Response): Promise<void> {
    const { status, response } = await this._leaderboardService.getAllLeaderboard();
    res.status(status).json(response);
  }
}
