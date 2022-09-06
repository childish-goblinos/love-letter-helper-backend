'use strict';

// bring in mongoose:
const mongoose = require('mongoose');

// extract the schema property from the mongoose object
const { Schema } = mongoose;

// create a cat schema, define how our object will be structured
const LetterSchema = new Schema({
  title: {type: String, required: true},
  recipient: {type: String, required: true},
  body: {type: String, required: true},
  email: {type: String, required: true}
});

// define the model
// it gives mongoose functionality and a predefined schema to shape our data
// it takes in a string and a scheme
const LetterModel = mongoose.model('Letter', LetterSchema);

module.exports = LetterModel;
