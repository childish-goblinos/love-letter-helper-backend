'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Cat = require('./models/cat.js');

async function seed() {
  // structure the same as our Cat Schema
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}
  await Cat.create({
    title: 'To Bob',
    description: 'Lorum ipsum',
});
  await Cat.create({
    title: 'To Ginger',
    description: 'Lorum ipsum',
  });
  mongoose.disconnect();
}

seed();
