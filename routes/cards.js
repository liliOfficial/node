const express = require('express');
const router = express.Router();
const note = require('../models/note');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const cardInfo = note.getCard(id);
  console.log(cardInfo);
  res.send(`card ${id}: ${cardInfo}`);
});

router.get('/', (req, res) => {
  const cards = note.getCards();
  res.send(cards);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  note.removeCard(id);
  res.send(`${id} is removed!`);
});

module.exports = router;