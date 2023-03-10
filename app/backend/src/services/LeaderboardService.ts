import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private totalGames = async (id: number, path: any) => {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches.filter((e: any) => e[path] === id);
  };

  private async victories(id:number, path: any) {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeam') return matches.filter((e) => e.homeTeamGoals > e.awayTeamGoals);
    return matches.filter((a) => a.homeTeamGoals < a.awayTeamGoals);
  }

  private async draws(id:number, path: any) {
    const matches = await this.totalGames(id, path);
    return matches.filter((e) => e.homeTeamGoals === e.awayTeamGoals);
  }

  private async losses(id:number, path: any) {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeam') return matches.filter((e) => e.homeTeamGoals < e.awayTeamGoals);
    return matches.filter((e) => e.homeTeamGoals > e.awayTeamGoals);
  }

  private async goalsFavor(id:number, path: any) {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeam') return matches.reduce((a, c) => a + c.homeTeamGoals, 0);
    return matches.reduce((a, c) => a + c.awayTeamGoals, 0);
  }

  private async goalsOwn(id:number, path: any) {
    const matches = await this.totalGames(id, path);
    if (path === 'homeTeam') return matches.reduce((a, c) => a + c.awayTeamGoals, 0);
    return matches.reduce((a, c) => a + c.homeTeamGoals, 0);
  }

  private async efficiency(id:number, path: any) {
    const totalPoints = ((await this.victories(id, path)).length * 3)
      + (await this.draws(id, path)).length;
    const maxPointsPossible = (await this.totalGames(id, path)).length * 3;
    return ((totalPoints / maxPointsPossible) * 100).toFixed(2);
  }

  private sortLeaderboard = (arrInfoTeams: any) => arrInfoTeams.sort(
    (a: any, b: any) => (b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn),
  );

  public getAllLeaderboard = async (path: any) => {
    const getAllTeams = await Teams.findAll();
    const arrInfoTeams = await Promise.all(
      getAllTeams.map(async ({ id, teamName }) => ({
        name: teamName,
        totalPoints: ((await this.victories(id, path)).length * 3)
          + (await this.draws(id, path)).length,
        totalGames: (await this.totalGames(id, path)).length,
        totalVictories: (await this.victories(id, path)).length,
        totalDraws: (await this.draws(id, path)).length,
        totalLosses: (await this.losses(id, path)).length,
        goalsFavor: await this.goalsFavor(id, path),
        goalsOwn: await this.goalsOwn(id, path),
        goalsBalance: await this.goalsFavor(id, path) - await this.goalsOwn(id, path),
        efficiency: await this.efficiency(id, path),
      })),
    );
    const arrInfoTeamsSort = this.sortLeaderboard(arrInfoTeams);
    return { status: 200, response: arrInfoTeamsSort };
  };

  public getAllHomeAway = async () => {
    const arrComplete = await this.calcHomeAway();
    const arrSort = this.sortLeaderboard(arrComplete);
    return { status: 200, response: arrSort };
  };

  calcHomeAway = async () => {
    const arrHome = (await this.getAllLeaderboard('homeTeam')).response;
    const arrAway = (await this.getAllLeaderboard('awayTeam')).response;
    return arrHome.map((team: any) => {
      const teamAway = arrAway.find((e: any) => e.name === team.name);
      return {
        name: team.name,
        totalPoints: team.totalPoints + teamAway.totalPoints,
        totalGames: team.totalGames + teamAway.totalGames,
        totalVictories: team.totalVictories + teamAway.totalVictories,
        totalDraws: team.totalDraws + teamAway.totalDraws,
        totalLosses: team.totalLosses + teamAway.totalLosses,
        goalsFavor: team.goalsFavor + teamAway.goalsFavor,
        goalsOwn: team.goalsOwn + teamAway.goalsOwn,
        goalsBalance: team.goalsBalance + teamAway.goalsBalance,
        efficiency: (((team.totalPoints + teamAway.totalPoints)
          / ((team.totalGames + teamAway.totalGames) * 3)) * 100).toFixed(2),
        // efficiency: ((+team.efficiency) + (+teamAway.efficiency)) / 2,
      };
    });
  };
}
