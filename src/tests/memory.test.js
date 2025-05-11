// src/tests/memory.test.js
const request = require('supertest');
const app = require('../server'); // Your express app

describe('Memory API', () => {
  it('should store a memory', async () => {
    const res = await request(app)
      .post('/api/memory')
      .send({ content: 'Test memory' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should get memory insights', async () => {
    const res = await request(app).get('/api/memory/insights');
    expect(res.status).toBe(200);
    expect(res.body.insights).toBeDefined();
  });

  it('should update a memory', async () => {
    const res = await request(app)
      .put('/api/memory/1')
      .send({ content: 'Updated memory' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Memory updated successfully');
  });

  it('should delete a memory', async () => {
    const res = await request(app).delete('/api/memory/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Memory deleted successfully');
  });
});
