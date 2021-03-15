import * as dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ProductList } from './server/Products/ProductList';

/* eslint-disable */

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

dotenv.config({ path:__dirname+'/.env' });

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

const app = express();

if (isString(url)) {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then((response: any) => {
  console.log('note saved!')
  console.log(response)
  mongoose.connection.close()
})

app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.get('/api/products', (_req, res) => {
  res.json(ProductList);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});