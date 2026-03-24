import request from 'supertest';
import { app } from '../src/app';

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('returns OK', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.text).toBe('OK');
    });
  });

  describe('POST /assessments', () => {
    it('returns score and issues for valid input', async () => {
      const res = await request(app)
        .post('/assessments')
        .send({ sittingHours: 10, painAreas: ['NECK', 'SHOULDERS'] });
      expect(res.status).toBe(200);
      expect(res.body.score).toBeDefined();
      expect(res.body.issues).toBeInstanceOf(Array);
      expect(res.body.issues.length).toBeGreaterThan(0);
    });

    it('returns 400 for invalid input', async () => {
      const res = await request(app)
        .post('/assessments')
        .send({ sittingHours: 'bad' });
      expect(res.status).toBe(400);
    });

    it('returns 400 for missing fields', async () => {
      const res = await request(app).post('/assessments').send({});
      expect(res.status).toBe(400);
    });
  });

  describe('POST /routines/generate', () => {
    it('returns 4 exercises for valid issues', async () => {
      const res = await request(app)
        .post('/routines/generate')
        .send({
          issues: [
            { name: 'Forward Head Posture', severity: 'SEVERE', fixDays: '7-14' },
            { name: 'Rounded Shoulders', severity: 'MODERATE', fixDays: '14-21' },
          ],
        });
      expect(res.status).toBe(200);
      expect(res.body.exercises).toHaveLength(4);
      expect(res.body.id).toBeDefined();
      expect(res.body.generatedAt).toBeDefined();
    });

    it('returns 400 for invalid input', async () => {
      const res = await request(app)
        .post('/routines/generate')
        .send({ issues: 'not an array' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /exercises', () => {
    it('returns the exercise library with 20+ exercises', async () => {
      const res = await request(app).get('/exercises');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(20);
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('targets');
    });
  });

  describe('POST /daily-check', () => {
    it('returns score, delta and microTip', async () => {
      const res = await request(app)
        .post('/daily-check')
        .send({
          baselineScore: 42,
          issues: [
            { name: 'Forward Head Posture', severity: 'SEVERE', fixDays: '7-14' },
          ],
        });
      expect(res.status).toBe(200);
      expect(res.body.score).toBeGreaterThanOrEqual(42);
      expect(res.body.microTip).toBeDefined();
      expect(res.body.checkedAt).toBeDefined();
    });

    it('returns 400 for invalid input', async () => {
      const res = await request(app)
        .post('/daily-check')
        .send({ baselineScore: 'bad' });
      expect(res.status).toBe(400);
    });
  });
});
