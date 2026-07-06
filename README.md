# Todolist App

Aplikasi To-Do List sederhana (Node.js + Express) yang dibuat untuk Tugas
Praktikum Terintegrasi: Docker, Container Orchestration, dan CI/CD.

## Menjalankan secara lokal

```bash
npm install
npm start
```

Buka `http://localhost:3000` di browser.

## Menjalankan test

```bash
npm test
```

## Menjalankan dengan Docker

```bash
docker build -t todolist-app:v1 .
docker run -d --name todolist-app -p 8080:3000 todolist-app:v1
```

Buka `http://localhost:8080`.

## Menjalankan dengan Docker Compose

```bash
docker compose up -d
docker compose ps
docker compose down
```

## Endpoint

| Method | Path                     | Deskripsi              |
|--------|--------------------------|-------------------------|
| GET    | /health                  | Health check            |
| GET    | /api/todos               | Ambil semua tugas       |
| POST   | /api/todos               | Tambah tugas baru       |
| PATCH  | /api/todos/:id/toggle    | Ubah status selesai     |
| DELETE | /api/todos/:id           | Hapus tugas             |
