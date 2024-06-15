const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const loggerOne = require('./middlewares/loggerOne')

const {
  PORT = 3005,
  API_URL = 'http://localhost',
  MONGO_URL = 'mongodb://localhost:27017/mydb'
} = process.env;

dotenv.config();
const app = express();
app.use(userRouter)
app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());

// mongoose.connect(MONGO_URL);
// const database = mongoose.connection;
// database.on('error', (error) => {
//   console.log(error);
// });
// database.once('connected', () => {
//   console.log('Database Connected');
// });

mongoose.connect(MONGO_URL).catch(error => handleError(error));

const helloWorld = (request, response) => {
  response.status(200);
  response.send('Hello, world!');
}

app.get('/', helloWorld)

app.listen(PORT, () => {
  console.log(`Cервер запущен по адресу ${API_URL}:${PORT}`);
})