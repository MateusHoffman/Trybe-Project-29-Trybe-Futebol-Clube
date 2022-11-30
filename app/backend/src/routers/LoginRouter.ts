// import 'express-async-errors';
import { Router } from 'express';
import loginValidate from '../middlewares/validations/loginValidate';
import LoginController from '../controllers/LoginController';

const router = Router();

const loginController = new LoginController();

router.post('/', loginValidate, (req, res) => loginController.post(req, res));
router.get('/validate', (req, res) => loginController.getRoleByToken(req, res));

export default router;
