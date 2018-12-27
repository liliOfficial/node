const express = require('express');
const router = express.Router();
const { Card, validate } = require('../models/card');

router.post('/add', async (req, res) => {
  const card = new Card({
    cardId: Math.random()
      .toString(10)
      .slice(2, 9),
    cardLastFour: req.body.cardLastFour,
    status: 'Active',
    addedDate: new Date()
  });

  await card.save();

  res.send(card);
});

router.get('/', async (req, res) => {
  const sortBy = req.query.sortby;
  const cards = await Card.find().sort(sortBy);
  res.send(cards);
});

router.get('/:cardId', async (req, res) => {
  const cardId = req.params.cardId;
  const cards = await Card.find();
  const card = cards.find(e => e.cardId === cardId);

  if (!card) return res.status(404).send(`Cannot find this card!`);

  res.send(card);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const card = await Card.findByIdAndDelete(id);

  if (!card)
    return res.status(404).send(`The card with the given ID was not found`);

  res.send(card);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const card = await Card.findById(id);
  if (!card)
    return res.status(404).send(`The card with the given ID was not found`);

  const cardNew = {
    cardId: card.cardId,
    cardLastFour: req.body.cardLastFour,
    status: req.body.status || card.status,
    addedDate: card.addedDate
  };

  const { error } = validate(cardNew);
  if (error) return res.status(400).send(error.details[0].message);

  await Card.findByIdAndUpdate(id, cardNew);

  res.send(cardNew);
});

module.exports = router;
