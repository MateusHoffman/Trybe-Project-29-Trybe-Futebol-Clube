import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService {
  public getAllMatches = async () => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, response: matches };
  };

  public getByProgress = async (query: any) => {
    const matches = await Matches.findAll({
      where: { inProgress: query === 'true' },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, response: matches };
  };
}
