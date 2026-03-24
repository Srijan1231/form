import { Router } from 'express';
import { z } from 'zod';
import { generateRoutine } from '../services/routineGenerator';
import type { PostureIssue } from '../types';

export const routineRouter = Router();

const generateSchema = z.object({
  issues: z.array(
    z.object({
      name: z.string(),
      severity: z.string(),
      fixDays: z.string(),
    })
  ),
});

routineRouter.post('/generate', (req, res) => {
  const parsed = generateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const exercises = generateRoutine(parsed.data.issues as PostureIssue[]);
  res.json({
    id: `routine-${Date.now()}`,
    exercises,
    generatedAt: new Date().toISOString(),
  });
});
