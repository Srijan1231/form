import { Router } from 'express';
import { z } from 'zod';
import { getMicroTip } from '../services/microTips';
import type { PostureIssue } from '../types';

export const dailyCheckRouter = Router();

const checkSchema = z.object({
  baselineScore: z.number().min(0).max(100),
  issues: z.array(
    z.object({
      name: z.string(),
      severity: z.string(),
      fixDays: z.string(),
    })
  ),
});

dailyCheckRouter.post('/', (req, res) => {
  const parsed = checkSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { baselineScore, issues } = parsed.data;
  const improvement = Math.floor(Math.random() * 5) + 1;
  const todayScore = Math.min(100, baselineScore + improvement);
  const microTip = getMicroTip(issues as PostureIssue[]);

  res.json({
    score: todayScore,
    delta: todayScore - baselineScore,
    microTip,
    checkedAt: new Date().toISOString(),
  });
});
