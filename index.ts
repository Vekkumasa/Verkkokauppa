import express from 'express';
const app = express();

app.get('/ping', (_req, _res) => {
  _res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});