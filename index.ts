import * as dotenv from "dotenv";
import express from 'express';
// import mongoose from 'mongoose';
import cors from 'cors';

import ProductRouter from './server/Routers/ProductRouter';
import ProductController from './server/Controllers/ProductController';
import { StringCheck } from './server/utils/StringCheck';
//import UserSchema from './server/models/user';
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
app.use(express.static('build'));

if (StringCheck(url)) {
  connect(url);
}

/*
const User = UserSchema;

const user = new User({
  email: 'admin@admin.fi',
  firstName: 'admin',
  lastName: 'adminen',
  userName: 'admin',
  passwordHash: 'admin',
  userType: 'admin',
});

void user.save().then((response: any) => {
  console.log('user saved!');
  console.log(response);
  void mongoose.connection.close();
});
*/

app.use(cors());
app.use('/api/products', ProductRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/health', (_req, res) => {
  res.send('ok');
});

app.get("/products", ProductController.AllProducts);
app.get("/users", UserController.allUsers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});