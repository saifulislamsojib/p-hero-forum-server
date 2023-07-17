import {
  authCheckResponse,
  getLoggedInUser,
  login,
  registration,
} from '@/controllers/auth.controller';
import authCheck from '@/middleware/auth.middleware';
import { Router } from 'express';

const authRoute = Router();

authRoute.get('/', authCheck, authCheckResponse);
authRoute.get('/current-user', authCheck, getLoggedInUser);
authRoute.post('/registration', registration);
authRoute.post('/login', login);

export default authRoute;
