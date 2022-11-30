import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../../utils/JWT';
import Teams from '../../database/models/Teams';

const matchesValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const { authorization } = req.headers;
  const homeTeamExist = await Teams.findOne({ where: { id: homeTeam } });
  const awayTeamExist = await Teams.findOne({ where: { id: awayTeam } });
  if (!homeTeamExist || !awayTeamExist) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  if (!validateToken(authorization)) {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }
  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default matchesValidate;
