'use strict'

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Data = require('./data.js')

// bring in Mongoose
const mongoose = require('mongoose');

// must bring in a scheme if we want to interact with that model
const Letter = require('./models/letter.js');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});
mongoose.connect(process.env.DB_URL);

// USE
// implement express

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome to our Love Letter Backend!');
});

app.get('/sentiment', Data.getSentiment);

app.get('/letters', Data.getLetters);

app.delete('/letters/:id', Data.deleteAnItem);

app.post('/letters', Data.addAnLetter);

app.put('/letters/:id', Data.editALetter);

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});


// ERROR
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
