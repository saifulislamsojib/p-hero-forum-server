import cors from 'cors';
import express from 'express';
import configs from './configs';
import mongoConnect from './db/db';
import errorHandler, { notFound } from './middleware/errorHandler.middleware';
import apiRoute from './routes/api.routes';
import authRoute from './routes/auth.routes';
import rootRoute from './routes/root.routes';

import { app, server } from './utils/createServer';

const { port, origin } = configs;

// app middleware
app.use(express.json());
app.use(cors({ origin, credentials: true }));

// database connection with mongoose
mongoConnect();

// all routes
app.use('/', rootRoute);
app.use('/api', apiRoute);
app.use('/auth', authRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

// listen server
server.listen(port, () => {
  console.log(`Hello Boss! I am listening at http://localhost:${port}`);
});
