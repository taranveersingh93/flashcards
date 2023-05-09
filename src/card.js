const createCard = (id, question, answers, correctAnswer) => (
  {
    id: id,
    question: question,
    answers: answers,
    correctAnswer: correctAnswer
  }
)

const evaluateGuess = (guess, correctAnswer) => {
  if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
    return 'correct!'
  } else {
    return 'incorrect!';
  }; 
}
module.exports = {
  createCard,
  evaluateGuess
}