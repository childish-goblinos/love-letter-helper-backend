'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Letter = require('./models/letter.js');

async function seed()
{
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
  await Letter.create({
    title: 'Dear Darla',
    recipient: 'Darla',
    body: `'I hate ur stinkin' guts! You make me vomit. You're the scum between my toes. Love, Grandma <3`,
    email: 'rheamimicarillo@gmail.com'
  });
  mongoose.disconnect();
}

seed();
