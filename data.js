'use strict';

const Letter = require('./models/letter.js');
require('dotenv').config();
const axios = require('axios');
const Semantics= require('./semantics.json');
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
    let url = `https://api.api-ninjas.com/v1/sentiment?text=${req.query.text}`;


    let results = await axios.get(url, {
      headers: {
        'X-API-Key': `${process.env.REACT_API_KEY}`
      }
    });
    //lets remove the text block so we aren't sending over text we already have
    delete results.data.text;


    // Takes the score from the API call and rounds it two a single decimal point
    let roundedScore = Math.round(results.data.score * 10) / 10

    //for the array of Semantics adds the matching scores semantic to the results we send.
    results.data.score = roundedScore;
    for(let i in Semantics){
      console.log(Semantics[i])
      if(Semantics[i].score === roundedScore) {
        results.data.grade = Semantics[i].association;
        break;
      }
    }

    res.send(results.data);

  }catch(err){
    res.send(err.message);
  }
}

Data.deleteAnItem = async(req, res) => {
  try{
    let results = await Letter.findByIdAndDelete(req.params.id);
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
