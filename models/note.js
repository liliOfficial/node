console.log('note.js');
const fs = require('fs');

const day = 365;

const addNote = name => {
  const test = `Hello ${name}！ You have been here for ${day} days! \n`;
  fs.appendFileSync('files/greeting.txt', test);
  return test;
};

const fetchNote = () => {
  try {
    const notesString = fs.readFileSync('../files/note.json');
    return JSON.parse(notesString);
  } catch (err) {
    return {};
  }
};

const addZero = (num, val) => {
  return (new Array(num).join('0') + val).slice(-num);
};

const getCards = () => {
  const notes = fetchNote();
  const cards = notes['enrollment']['cards'];
  return JSON.stringify(cards);
}

const getCard = id => {
  console.log(typeof(id));
  const notes = fetchNote();
  const cards = notes['enrollment']['cards'];
  const card = cards.filter(card => card['cardId'] === id);
  return JSON.stringify(card);
};

const addCard = () => {
  const date = new Date();
  const id = Math.random().toString(10).slice(2,9);
  const fourNo = Math.random().toString(10).slice(2,6);
  const note = {
    cardId: id,
    cardLastFour: fourNo,
    status: 'Active',
    addedDate: date
  };

  let notes = fetchNote();
  notes['enrollment']['cards'].push(note);
  fs.writeFileSync('files/note.json', JSON.stringify(notes));
  return JSON.stringify(notes['enrollment']['cards']);
};

const removeCard = id => {
  let notes = fetchNote();

  const cards = notes['enrollment']['cards'];
  const newCards = cards.filter(card => card['cardId'] !== id);

  notes['enrollment']['cards'] = newCards;
  fs.writeFileSync('files/note.json', JSON.stringify(notes));
  console.log(id + ' has been removed');
};

module.exports = {
  day,
  addNote,
  getCards,
  getCard,
  addCard,
  removeCard
};
