import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private totalGames = async (id: number) => {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches.filter((e) => e.homeTeam === id);
  };

  private async victories(id:number) {
    const matches = await this.totalGames(id);
    return matches.filter((e) => e.homeTeamGoals > e.awayTeamGoals);
  }

  private async draws(id:number) {
    const matches = await this.totalGames(id);
    return matches.filter((e) => e.homeTeamGoals === e.awayTeamGoals);
  }

  private async losses(id:number) {
    const matches = await this.totalGames(id);
    return matches.filter((e) => e.homeTeamGoals < e.awayTeamGoals);
  }

  private async goalsFavor(id:number) {
    const matches = await this.totalGames(id);
    return matches.reduce((a, c) => a + c.homeTeamGoals, 0);
  }

  private async goalsOwn(id:number) {
    const matches = await this.totalGames(id);
    return matches.reduce((a, c) => a + c.awayTeamGoals, 0);
  }

  private async efficiency(id:number) {
    const totalPoints = ((await this.victories(id)).length * 3) + (await this.draws(id)).length;
    const maxPointsPossible = (await this.totalGames(id)).length * 3;
    return ((totalPoints / maxPointsPossible) * 100).toFixed(2);
  }

  private sortLeaderboard = (arrInfoTeams: any) => arrInfoTeams.sort(
    (a: any, b: any) => (b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn),
  );

  public getAllLeaderboard = async () => {
    const getAllTeams = await Teams.findAll();
    const arrInfoTeams = await Promise.all(
      getAllTeams.map(async ({ id, teamName }) => ({
        name: teamName,
        totalPoints: ((await this.victories(id)).length * 3) + (await this.draws(id)).length,
        totalGames: (await this.totalGames(id)).length,
        totalVictories: (await this.victories(id)).length,
        totalDraws: (await this.draws(id)).length,
        totalLosses: (await this.losses(id)).length,
        goalsFavor: await this.goalsFavor(id),
        goalsOwn: await this.goalsOwn(id),
        goalsBalance: await this.goalsFavor(id) - await this.goalsOwn(id),
        efficiency: await this.efficiency(id),
      })),
    );
    const arrInfoTeamsSort = this.sortLeaderboard(arrInfoTeams);
    return { status: 200, response: arrInfoTeamsSort };
  };
}
