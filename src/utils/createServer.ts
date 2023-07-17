import express from 'express';
import { createServer } from 'http';

// app initialization
export const app = express();

// create server
export const server = createServer(app);
