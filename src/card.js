const createCard = (id, question, answers, correctAnswer) => (
  {
    id: id,
    question: question,
    answers: answers,
    correctAnswer: correctAnswer
  }
)

module.exports = {
  createCard,
}