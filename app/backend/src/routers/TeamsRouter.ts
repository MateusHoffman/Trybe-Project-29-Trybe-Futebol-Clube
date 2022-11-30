import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (req, res) => teamsController.getAllTeams(req, res));
router.get('/:id', (req, res) => teamsController.getTeamById(req, res));

export default router;
