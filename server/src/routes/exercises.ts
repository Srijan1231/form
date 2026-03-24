import { Router } from 'express';
import { exerciseLibrary } from '../seeds/exerciseData';

export const exerciseRouter = Router();

exerciseRouter.get('/', (_req, res) => {
  res.json(exerciseLibrary);
});
