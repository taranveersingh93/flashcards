const { createCard } = require('./card');
const data = require('./data');
const { createDeck, createRound, countCards } = require('./round');
const prototypeQuestions = data.prototypeData;
const util = require('./util');

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

const makeCards = cardsData => {
  return cardsData.map(cardData => createCard(cardData.id, cardData.question, cardData.answers, cardData.correctAnswer));
}

const start = () => {
  const cards = makeCards(prototypeQuestions);
  const deck = createDeck(cards);
  const roundZero = createRound(deck);
  printMessage(deck);
  printQuestion(roundZero);
}

module.exports = { 
  printMessage, 
  printQuestion,
  makeCards,
  start 
};
