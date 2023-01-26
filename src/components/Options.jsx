import React from 'react';
import { decode } from 'html-entities'



function Options({ datum, index, updateAnswers, selectedAnswer, correctAnswer, question, showResult }) {
  function checkAnswer(datum, currentQuestion) {
    updateAnswers(currentQuestion, datum)
  }

  return (
    <>
      <button
        key={index}
        onClick={() => checkAnswer(datum, question)}
        className={`opt-btn
         ${datum === selectedAnswer ? 'selected' : ''}
           ${showResult && datum === correctAnswer ? 'correct' : ''}
          ${showResult && datum === selectedAnswer &&
            datum !== correctAnswer ? 'incorrect' : ''}
           ${showResult && datum !== correctAnswer ? 'dimmed' : ''}  
        `}
        disabled={showResult}
      >
        {decode(datum)}
      </button>
    </>
  )

}

export default Options;
