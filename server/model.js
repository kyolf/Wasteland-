'use strict';

const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  score: Number,
  initials: String
});

scoreSchema.methods.apiRepr = function() {
  return {
    score: this.score,
    id: this._id,
    initials: this.initials
  };
}; 

const Score = mongoose.model('Score', scoreSchema);

module.exports = {Score};