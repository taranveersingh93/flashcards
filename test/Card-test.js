const chai = require('chai');
const expect = chai.expect;

const { 
  createCard, 
  evaluateGuess 
} = require('../src/card');
const { subCards } = require('../test/subdata');

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
});

