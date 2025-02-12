const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const {
  createDeck,
  createRound,
  takeTurn,
  calculatePercentCorrect
} = require('../src/round');

const {
  start
} = require('../src/game');

const { 
  subCards
 } = require('../test/subdata');

const {
  makeCards
} = require('../src/game');

describe('check for start', function() {
  it('should exist as a function', function() {
    expect(start).to.be.a('function');
  })
});

describe('playing rounds neutral tests', function() {
  let cards;
  let startingDeck;
  let round;
  let guess;
  
  beforeEach(function() {
    cards = makeCards(subCards);
    startingDeck = createDeck(cards);
    round = createRound(startingDeck);
    guess = "incorrect";
  })

  it('should initialize round with the correct defaults', function() {
    assert.isObject(round);
    expect(round.currentCard).to.deep.equal({
      "id": 1,
      "question": "What allows you to define a set of related information using key-value pairs?",
      "answers": ["object", "array", "function"],
      "correctAnswer": "object"
    });
    expect(round.turns).to.equal(0);
    expect(round.incorrectGuesses.length).to.equal(0);
  });

  it('should increase the number of turns upon a guess', function() {
    takeTurn(guess, round);
    expect(round.turns).to.equal(1);
  });

  it('should increase the number of turns upon multiple guesses', function() {
    takeTurn(guess, round);
    takeTurn(guess, round);
    takeTurn(guess, round);
    expect(round.turns).to.equal(3);
  });

  it('should update the current card after a single turn', function() {
    takeTurn(guess, round);

    expect(round.currentCard).to.deep.equal({
      "id": 2,
      "question": "What is a comma-separated list of related values?",
      "answers": ["array", "object", "function"],
      "correctAnswer": "array"
    });
  })

  it('should update the current card after multiple turns', function() {
    takeTurn(guess, round);
    takeTurn(guess, round);

    expect(round.currentCard).to.deep.equal({
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answers": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"
    });
  })
});

describe('take turn with wrong guess', function() {
  let cards;
  let startingDeck;
  let round;
  let guess;
  
  beforeEach(function() {
    cards = makeCards(subCards);
    startingDeck = createDeck(cards);
    round = createRound(startingDeck);
    guess = "incorrect";
  });

  it('should store the ID of a card which is attempted incorrectly', function() {
    takeTurn(guess, round);
    expect(round.incorrectGuesses.length).to.equal(1);
    expect(round.incorrectGuesses).to.deep.equal([1]);
  });

  it('should store the ID of multiple card which are attempted incorrectly', function() {
    takeTurn(guess, round);
    takeTurn(guess, round);
    expect(round.incorrectGuesses.length).to.equal(2);
    expect(round.incorrectGuesses).to.deep.equal([1,2]);
  });
  
  it('should give negative feedback for a wrong answer', function() {
    const feedback = takeTurn(guess, round);
    expect(feedback).to.equal("incorrect!");
  });
})
  
describe('take turn with a correct guess', function() {
  let cards;
  let startingDeck;
  let round;
  let guess;
  
  beforeEach(function() {
    cards = makeCards(subCards);
    startingDeck = createDeck(cards);
    round = createRound(startingDeck);
    guess = "incorrect";
  });

  it('should give affirmative feedback for a right answer', function() {
    const correctGuess = "object";
    const feedback = takeTurn(correctGuess, round);
    expect(feedback).to.equal("correct!");
  });
  
  it('should not update incorrectGuesses array if a guess is correct', function() {
    const firstGuess = "object";
    const secondGuess = "array";
    takeTurn(firstGuess, round);
    takeTurn(secondGuess, round);
    expect(round.incorrectGuesses.length).to.equal(0);
  });

  it(`should calculate percentage of correct guess after single turn`, function() {
    const firstGuess = "object";
    takeTurn(firstGuess, round);
    const correctPercent = calculatePercentCorrect(round);
    expect(correctPercent).to.equal(100);
  });

  it('should calculate percentage of correct guesses after multiple turns', function() {
    const firstGuess = "object";
    const secondGuess = "array";
    const thirdGuess = "guess";
    takeTurn(firstGuess, round);
    takeTurn(secondGuess, round);
    takeTurn(thirdGuess, round);
    const correctPercent = calculatePercentCorrect(round);
    expect(correctPercent).to.equal(66);
  });
});