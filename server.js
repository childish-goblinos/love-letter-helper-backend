'use strict'

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in Mongoose
const mongoose = require('mongoose');

// must bring in a scheme if we want to interact with that model
const letter = require('./models/letter.js');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// connect Mongoose to our MongoDB
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
  response.status(200).send('Welcome!');
});

app.get('/cats', getCats);
app.post('/cats', postCats);

// :id - declares a variable on a URL path
// we will send the ID of the cat we want to delete
app.delete('/cats/:id', deleteCats);
app.put('/cats/:id', putCats);

async function getCats(req, res, next) {
  try {
    let results = await Cat.find();
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

async function postCats(req, res, next) {
  console.log(req.body);
  try {
    let createdCat = await Cat.create(req.body);
    res.status(200).send(createdCat);
  } catch(err) {
    next(err);
  }
} 

async function deleteCats(req, res, next) {
  console.log(req.params.id);
  try {
    await Cat.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted cat');
  } catch(err) {
    next(err);
  }
}
// let arr = [cat1, cat2, cat3]

// let backarr = [backCat1, cat2, backCat3];

async function putCats(req, res, next) {
  try {
    let id = req.params.id;

    // findByIdAndUpdate method takes in 3 arguments:
    // - 1. the id of the thing we want to update
    // - 2. the updated data object
    // - 3. an options object (this is just what we have to do)
    let updatedCat = await Cat.findByIdAndUpdate(id, req.body, { new: true, overwrite: true });
    res.status(200).send(updatedCat);
  } catch(err) {
    next(err);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
