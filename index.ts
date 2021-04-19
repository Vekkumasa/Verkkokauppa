import * as dotenv from "dotenv";
import express from 'express';
import cors from 'cors';

import ProductRouter from './server/Routers/ProductRouter';
import { StringCheck } from './server/utils/StringCheck';
import connect from './server/connect';
import * as UserController from './server/Controllers/UserController';
import { resolve } from 'path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: resolve(__dirname,'../.env')});
} else {
  dotenv.config({ path: resolve(__dirname,'.env')});
}

const url = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded());

if (StringCheck(url)) {
  connect(url);
}

app.use('/api/products', ProductRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/health', (_req, res) => {
  res.send('ok');
});

app.get("/users", UserController.allUsers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});