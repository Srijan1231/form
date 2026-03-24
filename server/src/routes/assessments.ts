import { Router } from 'express';
import { z } from 'zod';
import { assessPosture } from '../services/ruleEngine';

export const assessmentRouter = Router();

const assessmentSchema = z.object({
  sittingHours: z.number().min(1).max(16),
  painAreas: z.array(z.string()),
});

assessmentRouter.post('/', (req, res) => {
  const parsed = assessmentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const result = assessPosture(parsed.data);
  res.json(result);
});
