'use strict';

// bring in mongoose:
const mongoose = require('mongoose');

// extract the schema property from the mongoose object
const { Schema } = mongoose;

// create a cat schema, define how our object will be structured
const letterSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
});

// define the model
// it gives mongoose functionality and a predefined schema to shape our data
// it takes in a string and a scheme
const LetterModel = mongoose.model('Letter', letterSchema);

module.exports = LetterModel;
