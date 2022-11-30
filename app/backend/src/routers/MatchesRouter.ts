import { Router } from 'express';
import matchesValidate from '../middlewares/validations/matchesValidate';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));
router.post('/', matchesValidate, (req, res) => matchesController.postMatches(req, res));
router.patch('/:id/finish', (req, res) => matchesController.patchProgressMatches(req, res));
router.patch('/:id', (req, res) => matchesController.patchMatches(req, res));

export default router;
