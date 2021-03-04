import express from 'express';
import cors from 'cors';
import { ProductList } from './server/Products/ProductList';

const app = express();
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.get('/api/products', (_req, res) => {
  res.json(ProductList);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});