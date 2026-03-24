import { generateRoutine } from '../src/services/routineGenerator';
import type { PostureIssue } from '../src/types';

describe('Routine Generator', () => {
  it('returns exactly 4 exercises', () => {
    const issues: PostureIssue[] = [
      { name: 'Forward Head Posture', severity: 'SEVERE', fixDays: '7-14' },
    ];
    const routine = generateRoutine(issues);
    expect(routine).toHaveLength(4);
  });

  it('prioritizes exercises targeting detected issues', () => {
    const issues: PostureIssue[] = [
      { name: 'Forward Head Posture', severity: 'SEVERE', fixDays: '7-14' },
    ];
    const routine = generateRoutine(issues);
    const hasForwardHead = routine.some((ex) =>
      ex.targets.includes('forward_head')
    );
    expect(hasForwardHead).toBe(true);
  });

  it('handles multiple issues', () => {
    const issues: PostureIssue[] = [
      { name: 'Forward Head Posture', severity: 'SEVERE', fixDays: '7-14' },
      { name: 'Rounded Shoulders', severity: 'MODERATE', fixDays: '14-21' },
      { name: 'Tight Hip Flexors', severity: 'MILD', fixDays: '14-28' },
    ];
    const routine = generateRoutine(issues);
    expect(routine).toHaveLength(4);
    const targets = routine.flatMap((ex) => ex.targets);
    expect(targets).toContain('forward_head');
    expect(targets).toContain('rounded_shoulders');
    expect(targets).toContain('pelvic_tilt');
  });

  it('returns exercises with all required fields', () => {
    const issues: PostureIssue[] = [
      { name: 'Forward Head Posture', severity: 'MODERATE', fixDays: '7-14' },
    ];
    const routine = generateRoutine(issues);
    for (const ex of routine) {
      expect(ex.id).toBeDefined();
      expect(ex.name).toBeDefined();
      expect(ex.instruction).toBeDefined();
      expect(ex.reps).toBeDefined();
      expect(ex.durationSeconds).toBeGreaterThan(0);
      expect(ex.scorePoints).toBeGreaterThan(0);
      expect(ex.targets.length).toBeGreaterThan(0);
    }
  });

  it('does not repeat exercises', () => {
    const issues: PostureIssue[] = [
      { name: 'Forward Head Posture', severity: 'SEVERE', fixDays: '7-14' },
      { name: 'Rounded Shoulders', severity: 'MODERATE', fixDays: '14-21' },
    ];
    const routine = generateRoutine(issues);
    const ids = routine.map((ex) => ex.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
