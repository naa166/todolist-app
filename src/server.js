const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Penyimpanan sederhana di memori (cukup untuk kebutuhan tugas praktikum ini)
let todos = [];
let nextId = 1;

// Health check endpoint - dipakai untuk membuktikan container berjalan sehat
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Ambil semua todo
app.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

// Tambah todo baru
app.post('/api/todos', (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'Teks tugas tidak boleh kosong' });
  }
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// Ubah status selesai/belum
app.patch('/api/todos/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Tugas tidak ditemukan' });
  }
  todo.done = !todo.done;
  res.status(200).json(todo);
});

// Hapus todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  if (todos.length === before) {
    return res.status(404).json({ error: 'Tugas tidak ditemukan' });
  }
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

// Hanya jalankan server jika file ini dieksekusi langsung (bukan saat diimpor oleh test)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Todolist app berjalan di port ${PORT}`);
  });
}

module.exports = app;
