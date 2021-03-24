import * as dotenv from "dotenv";
import express from 'express';
//import mongoose from 'mongoose';
import cors from 'cors';

import * as ProductList  from './server/Products/ProductList';
import StringCheck from './server/utils/StringCheck';
//import UserSchema from './server/models/user';
import connect from './server/connect';
import * as UserController from './server/Controllers/userController';

dotenv.config({ path:__dirname+'/.env' });
const url = process.env.MONGODB_URI;

const app = express();

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

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.get('/api/products', (_req, res) => {
  res.json(ProductList);
});

app.get("/users", UserController.allUsers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});