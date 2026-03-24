import { SEVERITY, SCORE } from '../config/constants';
import type { AssessmentInput, AssessmentResult, PostureIssue } from '../types';

export function assessPosture(input: AssessmentInput): AssessmentResult {
  const { sittingHours, painAreas } = input;
  const issues: PostureIssue[] = [];

  const hasNeck = painAreas.includes('NECK');
  const hasUpperBack = painAreas.includes('UPPER BACK');
  const hasShoulders = painAreas.includes('SHOULDERS');

  if (hasNeck || sittingHours > 7) {
    issues.push({
      name: 'Forward Head Posture',
      severity: sittingHours > 9 ? SEVERITY.SEVERE : SEVERITY.MODERATE,
      fixDays: '7-14',
    });
  }

  if (hasUpperBack || hasShoulders) {
    issues.push({
      name: 'Rounded Shoulders',
      severity: SEVERITY.MODERATE,
      fixDays: '14-21',
    });
  }

  if (sittingHours > 8) {
    issues.push({
      name: 'Tight Hip Flexors',
      severity: SEVERITY.MILD,
      fixDays: '14-28',
    });
  }

  let score: number = SCORE.BASE;
  for (const issue of issues) {
    switch (issue.severity) {
      case SEVERITY.SEVERE:
        score -= SCORE.SEVERE_PENALTY;
        break;
      case SEVERITY.MODERATE:
        score -= SCORE.MODERATE_PENALTY;
        break;
      case SEVERITY.MILD:
        score -= SCORE.MILD_PENALTY;
        break;
    }
  }

  score = Math.max(0, Math.min(100, score));

  return { score, issues };
}
