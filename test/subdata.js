const { 
  createCard
} = require('../src/card');

const subCards = [{
  "id": 1,
  "question": "What allows you to define a set of related information using key-value pairs?",
  "answers": ["object", "array", "function"],
  "correctAnswer": "object"
}, {
  "id": 2,
  "question": "What is a comma-separated list of related values?",
  "answers": ["array", "object", "function"],
  "correctAnswer": "array"
}, {
  "id": 3,
  "question": "What type of prototype method directly modifies the existing array?",
  "answers": ["mutator method", "accessor method", "iteration method"],
  "correctAnswer": "mutator method"
}];

const refCard1 = subCards[0];
const refCard2 = subCards[1];
const refCard3 = subCards[2];
const card1 = createCard(refCard1.id, refCard1.question, refCard1.answers, refCard1.correctAnswer);
const card2 = createCard(refCard2.id, refCard2.question, refCard2.answers, refCard2.correctAnswer);
const card3 = createCard(refCard3.id, refCard3.question, refCard3.answers, refCard3.correctAnswer);

module.exports = {
  subCards,
  refCard1,
  refCard2,
  refCard3,
  card1,
  card2,
  card3,
}