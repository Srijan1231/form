import { assessPosture } from '../src/services/ruleEngine';

describe('Posture Rule Engine', () => {
  it('returns score 100 with no issues when no pain and low sitting hours', () => {
    const result = assessPosture({ sittingHours: 4, painAreas: ['NONE'] });
    expect(result.score).toBe(100);
    expect(result.issues).toHaveLength(0);
  });

  it('detects Forward Head Posture for NECK pain', () => {
    const result = assessPosture({ sittingHours: 5, painAreas: ['NECK'] });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ name: 'Forward Head Posture', severity: 'MODERATE' })
    );
  });

  it('detects Forward Head Posture as SEVERE for NECK + sitting > 9hrs', () => {
    const result = assessPosture({ sittingHours: 10, painAreas: ['NECK'] });
    const fhp = result.issues.find((i) => i.name === 'Forward Head Posture');
    expect(fhp?.severity).toBe('SEVERE');
  });

  it('detects Forward Head Posture when sitting > 7hrs (no NECK pain)', () => {
    const result = assessPosture({ sittingHours: 8, painAreas: ['NONE'] });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ name: 'Forward Head Posture' })
    );
  });

  it('detects Rounded Shoulders for UPPER BACK pain', () => {
    const result = assessPosture({ sittingHours: 5, painAreas: ['UPPER BACK'] });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ name: 'Rounded Shoulders', severity: 'MODERATE' })
    );
  });

  it('detects Rounded Shoulders for SHOULDERS pain', () => {
    const result = assessPosture({ sittingHours: 5, painAreas: ['SHOULDERS'] });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ name: 'Rounded Shoulders', severity: 'MODERATE' })
    );
  });

  it('detects Tight Hip Flexors when sitting > 8hrs', () => {
    const result = assessPosture({ sittingHours: 9, painAreas: ['NONE'] });
    expect(result.issues).toContainEqual(
      expect.objectContaining({ name: 'Tight Hip Flexors', severity: 'MILD' })
    );
  });

  it('does not detect Tight Hip Flexors when sitting <= 8hrs', () => {
    const result = assessPosture({ sittingHours: 8, painAreas: ['NONE'] });
    expect(result.issues.find((i) => i.name === 'Tight Hip Flexors')).toBeUndefined();
  });

  it('calculates score correctly for multiple issues', () => {
    // NECK + sitting 10hrs → Forward Head (SEVERE, -20) + Tight Hip Flexors (MILD, -6)
    const result = assessPosture({ sittingHours: 10, painAreas: ['NECK'] });
    expect(result.score).toBe(100 - 20 - 6); // 74
  });

  it('calculates score correctly for all issues', () => {
    // NECK + SHOULDERS + sitting 10hrs →
    //   Forward Head (SEVERE, -20) + Rounded Shoulders (MODERATE, -12) + Tight Hip Flexors (MILD, -6)
    const result = assessPosture({ sittingHours: 10, painAreas: ['NECK', 'SHOULDERS'] });
    expect(result.score).toBe(100 - 20 - 12 - 6); // 62
  });

  it('handles all pain areas selected with high sitting hours', () => {
    const result = assessPosture({
      sittingHours: 16,
      painAreas: ['NECK', 'UPPER BACK', 'LOWER BACK', 'SHOULDERS', 'HIPS'],
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.issues.length).toBeGreaterThanOrEqual(2);
  });

  it('never returns a score below 0', () => {
    const result = assessPosture({
      sittingHours: 16,
      painAreas: ['NECK', 'UPPER BACK', 'SHOULDERS', 'HIPS'],
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
  });
});
