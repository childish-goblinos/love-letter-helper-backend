'use strict';

const Letter = require('./models/letter.js');
require('dotenv').config();
const axios = require('axios');


const Data = { };

//Takes a query in the form of (http://localhost:3001/letters?title=<Your title here>)
Data.getLetters = async(req,res,next) => {
  try {
    let results = await Letter.find({'email': req.query.email});
    res.status(200).send(results);
  } catch (err) {
    next(err.message);
  }
}

Data.getSentiment = async(req, res) => {
  try {
    let results = await axios.get(`https://api.api-ninjas.com/v1/sentiment?text=${req.query.text}`, {
      headers: {
        'X-API-Key': `${process.env.REACT_API_KEY}`
      }
    });
    res.send(results.data);
  }catch(err){
    res.send(err.message);
  }
}

Data.deleteAnItem = async(req, res) => {
  try{
    let results = await Letter.findByIdAndDelete(req.params.id)
    res.status(200).json(results);
  }catch(err){
    res.send(err.message)
  }
}

Data.addAnLetter = async(req,res,next) => {
  try {
    const item = new Letter(req.body);
    await item.save();
    res.status(200).json(item);
  } catch(e) { next(e.message); }
}

Data.editALetter = async(req, res, next) => {
  try {
    let id = req.params.id;
    let result = await Letter.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    });
    res.status(200).send(result);
    console.log(result)
  } catch (err) {
    next(err);
  }
}

module.exports = Data;
