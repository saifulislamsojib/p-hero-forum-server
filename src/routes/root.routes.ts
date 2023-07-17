import { Router } from 'express';

const rootRoute = Router();

rootRoute.get('/', (_req, res) => {
  res.send('Welcome to the server boss!');
});

export default rootRoute;
