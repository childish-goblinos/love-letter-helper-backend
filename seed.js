'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Letter = require('./models/letter.js');

async function seed() {
  // structure the same as our Cat Schema
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}
  await Letter.create({
    title: 'To gf',
    recipient: 'Nia',
    body: 'Have a nice day',
    email: 'jacko7557@gmail.com'
});
  await Letter.create({
    title: 'To my enemies',
    recipient: 'Haters',
    body: 'Hate you',
    email: 'jacko7557@gmail.com'
  });
  mongoose.disconnect();
}

seed();
