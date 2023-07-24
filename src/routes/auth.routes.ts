import {
  authCheckResponse,
  getLoggedInUser,
  login,
  registration,
} from '@/controllers/auth.controller';
import authCheck, { tokenCheck } from '@/middleware/auth.middleware';
import { Router } from 'express';

const authRoute = Router();

authRoute.get('/', tokenCheck, authCheck, authCheckResponse);
authRoute.get('/current-user', tokenCheck, authCheck, getLoggedInUser);
authRoute.post('/registration', registration);
authRoute.post('/login', login);

export default authRoute;
