import Teams from '../database/models/Teams';

export default class TeamsService {
  public getAllTeams = async () => {
    const teams = await Teams.findAll();
    return { status: 200, response: teams };
  };

  public getTeamById = async (id: any) => {
    const team = await Teams.findOne({ where: { id } });
    return { status: 200, response: team };
  };
}
