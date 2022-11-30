import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));
router.post('/', (req, res) => matchesController.postMatches(req, res));

export default router;
