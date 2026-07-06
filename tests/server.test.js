const request = require('supertest');
const app = require('../src/server');

describe('Todolist API', () => {
  test('GET /health mengembalikan status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/todos awalnya mengembalikan array', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/todos menambahkan tugas baru', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Belajar Docker' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Belajar Docker');
    expect(res.body.done).toBe(false);
  });

  test('POST /api/todos menolak teks kosong', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: '   ' });
    expect(res.statusCode).toBe(400);
  });

  test('PATCH /api/todos/:id/toggle mengubah status selesai', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ text: 'Uji toggle' });
    const id = created.body.id;

    const res = await request(app).patch(`/api/todos/${id}/toggle`);
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);
  });

  test('DELETE /api/todos/:id menghapus tugas', async () => {
    const created = await request(app)
      .post('/api/todos')
      .send({ text: 'Uji hapus' });
    const id = created.body.id;

    const res = await request(app).delete(`/api/todos/${id}`);
    expect(res.statusCode).toBe(204);
  });
});
