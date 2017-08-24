'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {DATABASE_URL, PORT} = require('./config');
const {Score} = require('./model');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

app.get('/api/topScores', (req, res) => {
  Score
    .find()
    .sort({score: -1})
    .then(scores => {
      res.json(scores.map((score) => {
        return score.apiRepr();
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'It appears the monkeys are at it again, we were unable to retreive the top scores'});
    });
});

app.post('/api/topScores', (req, res) => {
  const requiredFields = ['score', 'initials'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Score
    .find()
    .sort({score: 1})
    .then(scores => {
      if(scores.length >= 10){
        Score.findByIdAndRemove(scores[0]._id).then(() => res.status(204).end());
      }else{
        return;
      }
    });

  Score
    .create({
      score: req.body.score,
      initials: req.body.initials
    })
    .then(score => res.status(201).json(score))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'The monkeys have clogged up the scores with their banana peels, unable to post score'});
    });
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Well shoot'});
});


let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {runServer, app, closeServer};