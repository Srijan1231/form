import type { Exercise, PostureIssue } from '../types';
import { exerciseLibrary } from '../seeds/exerciseData';

export function generateRoutine(issues: PostureIssue[]): Exercise[] {
  const targetAreas: string[] = issues.map((issue) => {
    if (issue.name === 'Forward Head Posture') return 'forward_head';
    if (issue.name === 'Rounded Shoulders') return 'rounded_shoulders';
    if (issue.name === 'Tight Hip Flexors') return 'pelvic_tilt';
    return 'general';
  });

  const matchingExercises = exerciseLibrary.filter((ex) =>
    ex.targets.some((t) => targetAreas.includes(t))
  );

  const selected: Exercise[] = [];
  const usedIds = new Set<string>();

  for (const target of targetAreas) {
    const candidates = matchingExercises.filter(
      (ex) => ex.targets.includes(target) && !usedIds.has(ex.id)
    );
    if (candidates.length > 0) {
      const pick = candidates[0];
      selected.push(pick);
      usedIds.add(pick.id);
    }
  }

  while (selected.length < 4) {
    const remaining = exerciseLibrary.filter((ex) => !usedIds.has(ex.id));
    if (remaining.length === 0) break;
    selected.push(remaining[0]);
    usedIds.add(remaining[0].id);
  }

  return selected.slice(0, 4);
}
