import Options from './Options'
import { decode } from 'html-entities'
import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'



function Exam({ setShowScreen }) {
  const [message, setMessage] = useState();
  const [opendb, setOpendb] = useState([])
  const [questions, setQuestions] = useState([])
  const [correctNumAnswers, setCorrectNumAnswers] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const URI = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

  useEffect(() => {
    async function getQuiz() {
      const res = await fetch(URI);
      const data = await res.json();
      setOpendb(data.results);

      setQuestions(
        data.results.map((question) => {
          // console.log(question)
          return {
            question: question.question,
            shuffledAnswers: shuffle([...question.incorrect_answers, question.correct_answer]),
            correctAnswer: question.correct_answer,
            selectedAnswer: ""
          }
        })
      )
    }
    getQuiz();
  }, [URI])


  // shuffle array of answers
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }



  function updateAnswers(currentQuestion, answer) {
    setQuestions(questions.map((questionObject) => (
      questionObject.question === currentQuestion ?
        { ...questionObject, selectedAnswer: answer }
        : questionObject
    )))
  }


  function checkSubmission() {
    const notAllAnswered = questions.some((question) => (
      question.selectedAnswer === ''
    ))
    setMessage(notAllAnswered)

    if (!notAllAnswered) {
      questions.forEach((optionObject) => {
        if (optionObject.selectedAnswer === optionObject.correctAnswer) {
          setCorrectNumAnswers(prevNum => prevNum + 1);
        }
      })
    }

    if (message === false) {
      if (correctNumAnswers || correctNumAnswers === 0) {
        setShowScreen(true);
        setShowResult(false)
        setQuestions([]);
        setCorrectNumAnswers(0)
      }
    }


    if (unattemptedQuestion.length === 0) {
      setPlayAgain(true);
      setShowResult(true);
    }

  }
  const unattemptedQuestion = questions.filter((optionObject) => optionObject.selectedAnswer === "");

  return (
    <>
      <div className="main-icons">
        {questions.map((data, index) => {
          return <div key={index} className="quiz">
            <div className="questionElement">
              <h2 className="question"> {decode(data.question)}</h2>

              <div className="options">
                {
                  data.shuffledAnswers.map((datum, index) => {
                    return <Options updateAnswers={updateAnswers}
                      selectedAnswer={data.selectedAnswer}
                      correctAnswer={data.correctAnswer}
                      key={index}
                      index={index}
                      datum={datum}
                      question={data.question}
                      showResult={showResult}
                    />
                  })
                }
              </div>
            </div>
            {showResult && <div className="iconElement">
              {showResult &&
                data.selectedAnswer === data.correctAnswer ?
                <FaCheckCircle size={20} ></FaCheckCircle> : <GrClose size={20} ></GrClose>
              }
            </div>
            }
          </div>
        })}
      </div>


      <div className="submit-btn">
        {
          message && unattemptedQuestion.length > 0 ? <p style={{ fontSize: "1.5rem", marginTop: "2rem", color: message ? "#ff5858" : "#293264" }} className="message">
            There {unattemptedQuestion.length > 1 ? "are" : "is"} {unattemptedQuestion.length}
            {unattemptedQuestion.length > 1 ? ' questions' : ' question'} not answered yet</p>
            : message === false && <p style={{ fontSize: "1.5rem", marginTop: "2rem", color: !message ? "#293264" : "#ff5858" }}
              className="message">You scored {correctNumAnswers} of {opendb.length} questions</p>
        }
        {questions.length > 0 ?
          <button className="answer-btn" onClick={checkSubmission} >{playAgain ? "Play again" : "Check answers"}</button>
          : null
        }

        {questions.length > 0 &&
          <code>Built by Ace_Moses</code>
        }
      </div>
    </>
  );
}
export default Exam;