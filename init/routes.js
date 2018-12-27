const express = require('express');
const cards = require('../routes/cards');
const cardsdb = require('../routes/cardsdb');
const users = require('../routes/users');

module.exports = function(app) {
  app.use(express.json());
  app.use('/cards', cards);
  app.use('/cardsdb', cardsdb);
  app.use('/users',users)
};
