// src/tests/session.test.js
const request = require('supertest');
const app = require('../server'); // Your express app

describe('Session API', () => {
  it('should start a session', async () => {
    const res = await request(app).post('/api/sessions/start').send({
      metadata: { key: 'value' },
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should end a session', async () => {
    const res = await request(app).post('/api/sessions/end/12345');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Session ended successfully');
  });
});
