const joi = require('joi');
const moogoose = require('mongoose');

const Card = moogoose.model(
  'Cards',
  new moogoose.Schema({
    cardId: {
      type: String,
      required: true
    },
    cardLastFour: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Active'
    },
    addedDate: {
      type: String,
      required: true
    }
  })
);

function validateCard(card) {
  const schema = {
    cardId: joi.string().required(),
    cardLastFour: joi.string().required(),
    status: joi.string().required(),
    addedDate: joi.string().required()
  };

  return joi.validate(card, schema);
}

exports.Card = Card;
exports.validate = validateCard;
