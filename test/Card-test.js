const chai = require('chai');
const expect = chai.expect;

const { 
  createCard, 
  evaluateGuess,
  createDeck,
  countCards,
} = require('../src/card');
const { 
  card1,
  card2,
  card3,
 } = require('../test/subdata');

describe('card', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });
});

describe('deck', function() {
  it('should create a deck if provided with an array of cards', function() {
    const cards = [card1, card2];
    const deck = createDeck(cards);
    expect(deck).to.deep.equal([{
      "id": 1,
      "question": "What allows you to define a set of related information using key-value pairs?",
      "answers": ["object", "array", "function"],
      "correctAnswer": "object"
    }, {
      "id": 2,
      "question": "What is a comma-separated list of related values?",
      "answers": ["array", "object", "function"],
      "correctAnswer": "array"
    }]);
  })

  it('should be able to count the number of cards in the deck', function() {
    const cards = [card1, card2, card3];
    const deck = createDeck(cards);
    const cardCount = countCards(deck);
    expect(cardCount).to.equal(3);
  })
})

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
    expect(firstWrongRound.feedback).to.equal("incorrect");
    expect(secondWrongRound.feedback).to.equal("incorrect");
  });

  it('should give give affirmative feedback for a right answer', function() {
    const firstGuess = "object";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    expect(firstRightRound.feedback).to.equal("correct");
  });
  
  it('should not update incorrectGuesses array if a guess is correct', function() {
    const firstGuess = "object";
    const secondGuess = "array";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    const secondRightRound = takeTurn(secondGuess, firstRightRound);
    expect(secondRightRound.incorrectGuesses.length).to.equal(0);
  });

  it('should calculate percentage of correct guesses', function() {
    const firstGuess = "object";
    const secondGuess = "array";
    const thirdGuess = "guess";
    const firstRightRound = takeTurn(firstGuess, zeroRound);
    const secondRightRound = takeTurn(secondGuess, firstRightRound);
    const thirdWrongRound = takeTurn(thirdGuess, secondRightRound);
    const percent = calculatePercentCorrect(thirdWrongRound);
    expect(percent).to.equal(100/3);
  })
});

describe('guess comparison', function() {
  it(`should help evaluate a correct guess against the card question`, function() {
    const guess = "correct answer";
    const correctAnswer = "correct answer";
    const compareGuess = evaluateGuess(guess, correctAnswer);
    expect(compareGuess).to.equal('correct!');
  });

  it('should help evaluate an incorrect guess against the card question', function() {
    const guess = "I know this";
    const correctAnswer = "No you don't";
    const compareGuess = evaluateGuess(guess, correctAnswer);
    expect(compareGuess).to.equal('incorrect!');
  });

  it('should evaluate a guess insensitive to case', function() {
    const guess = "ANSWER";
    const correctAnswer = "answer";
    const compareGuess = evaluateGuess(guess, correctAnswer);
    expect(compareGuess).to.equal('correct!');
  })

  it('should return incorrect answer if no answer provided', function() {
    const guess = "";
    const correctAnswer = "answer";
    const compareGuess = evaluateGuess(guess, correctAnswer);
    expect(compareGuess).to.equal('incorrect!');
  })
})