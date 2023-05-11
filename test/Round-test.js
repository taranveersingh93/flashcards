const chai = require('chai');
const expect = chai.expect;

const {
  createDeck,
  createRound,
  takeTurn,
  checkForEnd
} = require('../src/round')

const { 
  card1,
  card2,
  card3,
 } = require('../test/subdata');

describe('playing rounds', function() {
  let cards;
  let startingDeck;
  let zeroRound;
  let guess;
  let firstWrongRound;
  let secondWrongRound;
  
  beforeEach(function() {
    cards = [card1, card2, card3];
    startingDeck = createDeck(cards);
    zeroRound = createRound(startingDeck);
    guess = "incorrect";
    firstWrongRound = takeTurn(guess, zeroRound);
    secondWrongRound = takeTurn(guess, firstWrongRound);
  })

  it('should initialize round with the correct defaults', function() {
    expect(zeroRound.currentCard).to.deep.equal({
      "id": 1,
      "question": "What allows you to define a set of related information using key-value pairs?",
      "answers": ["object", "array", "function"],
      "correctAnswer": "object"
    });
    expect(zeroRound.turns).to.equal(0);
    expect(zeroRound.incorrectGuesses.length).to.equal(0);
  });

  it('should increase the number of turns upon a guess', function() {
    expect(firstWrongRound.turns).to.equal(1);
  })

  it('should update the current card after a guess', function() {
    expect(secondWrongRound.currentCard).to.deep.equal({
      "id": 3,
      "question": "What type of prototype method directly modifies the existing array?",
      "answers": ["mutator method", "accessor method", "iteration method"],
      "correctAnswer": "mutator method"
    });
  })

  it('should store the ID of a card which is attempted incorrectly', function() {
    expect(secondWrongRound.incorrectGuesses.length).to.equal(2);
    expect(secondWrongRound.incorrectGuesses).to.deep.equal([1,2]);
  });
  
  it('should give negative feedback for a wrong answer', function() {
    expect(firstWrongRound.feedback).to.equal("incorrect!");
    expect(secondWrongRound.feedback).to.equal("incorrect!");
  });

  it('should give affirmative feedback for a right answer', function() {
    const firstGuess = "object";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    expect(firstRightRound.feedback).to.equal("correct!");
  });
  
  it('should not update incorrectGuesses array if a guess is correct', function() {
    const firstGuess = "object";
    const secondGuess = "array";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    const secondRightRound = takeTurn(secondGuess, firstRightRound);
    expect(secondRightRound.incorrectGuesses.length).to.equal(0);
  });

  it(`should calculate percentage of correct guess after single turn`, function() {
    const firstGuess = "object";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    expect(firstRightRound.percentCorrect).to.equal(100);
  })

  it('should calculate percentage of correct guesses after multiple turns', function() {
    const firstGuess = "object";
    const secondGuess = "array";
    const thirdGuess = "guess";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    const secondRightRound = takeTurn(secondGuess, firstRightRound);
    const thirdWrongRound = takeTurn(thirdGuess, secondRightRound);
    expect(thirdWrongRound.percentCorrect).to.equal(66);
  });

  it('should not end round if turns don\'t equal deck\'s length', function() {
    const isEnded = checkForEnd(firstWrongRound);
    expect(isEnded).to.equal(false);
  });
  
  it('should end round if turns equal deck\'s length', function() {
    const thirdWrongRound = takeTurn(guess, secondWrongRound);
    const isEnded = checkForEnd(thirdWrongRound);
    expect(isEnded).to.equal(true);
  })
});