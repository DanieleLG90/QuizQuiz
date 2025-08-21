import React from 'react'
import he from 'he'
import Intro from "./components/Intro"
import Question from "./components/Question"
import ParticlesBack from "./components/ParticlesBack"

import './App.css'

function App() {

  const [quizStart, setQuizStart] = React.useState(false)
  const [quizQuestions, setQuizQuestions] = React.useState([])
  const [checkAnswersDisabled, setCheckAnswersDisabled] = React.useState(true)

  const [quizChecked, setQuizChecked] = React.useState(false)
  const [score, setScore] = React.useState(0)

  const [newGame, setNewGame] = React.useState(false)

    function go() {
      setQuizStart(true)
    }

    const shuffleArray = (array) => {
              for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))

                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
              }
              return array
            }

    
    React.useEffect (() =>{
      fetch("https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          //setQuizQuestions(data)
          const formattedQuestions = data.results.map(questionData => {
            const decodedQuestionText = he.decode(questionData.question)
            const allAnswers = [
            ...questionData.incorrect_answers,
            questionData.correct_answer
          ];
            
            
            
            const formattedAnswers = shuffleArray(allAnswers).map(answer => ({
              id: new Date().getTime() + Math.random(),
              text: he.decode(answer),
              isSelected: false,
            }))

            
            return {
              ...questionData, 
              id: new Date().getTime() + Math.random(), 
              question: decodedQuestionText,
              all_answers: formattedAnswers,
            }
          })
          setQuizQuestions(formattedQuestions);
          console.log(quizQuestions)
        })
    }, [newGame])
    // mapping per generare le domande
    const questionElements = quizQuestions.map(question => (
    <Question 
      key={question.id}
      question={question}
      handleSelectAnswer={handleSelectAnswer}
      quizChecked={quizChecked}
    />
  ));
  // function che controlla le risposte selezionate e modifica isSelected a true quando id corrisponde
  function handleSelectAnswer(questionId, selectedAnswerText) {
    setQuizQuestions(prevQuestions => {
      // Mappiamo l'array di domande precedente
      return prevQuestions.map(question => {
        // Troviamo la domanda che corrisponde all'ID
        if (question.id === questionId) {
          // Aggiorniamo le risposte di quella domanda
          const updatedAnswers = question.all_answers.map(answer => ({
            ...answer,
            // Se il testo della risposta corrisponde a quella selezionata, impostiamo isSelected a true
            isSelected: answer.text === selectedAnswerText
          }));
          // Restituiamo la domanda aggiornata
          return { ...question, all_answers: updatedAnswers };
        }
        // Se non è la domanda che ci interessa, la restituiamo invariata
        return question;
      });
    });
  }

  React.useEffect(() => {
  // `every()` controlla se tutti gli elementi soddisfano la condizione
  const allAnswered = quizQuestions.every(question => {
    // `some()` controlla se almeno un elemento soddisfa la condizione
    return question.all_answers.some(answer => answer.isSelected);
  });
  // Se tutte le domande hanno una risposta, il pulsante non è disabilitato (quindi `!allAnswered` è `false`)
  setCheckAnswersDisabled(!allAnswered);
}, [quizQuestions]);

// funzione che controlla quante risposte sono corrette e restituisce un numero
function checkAnswers() {
  let correctCount = 0;
  const updatedQuestions = quizQuestions.map(question => {
    const selectedAnswer = question.all_answers.find(answer => answer.isSelected);
    if (selectedAnswer && selectedAnswer.text === question.correct_answer) {
      correctCount++;
    }

    const newAnswers = question.all_answers.map(answer => {
      const isCorrect = answer.text === question.correct_answer;
      const isIncorrect = answer.text === selectedAnswer?.text && !isCorrect;
      
      return {
        ...answer,
        isCorrect: isCorrect,
        isIncorrect: isIncorrect
      };
    });
    
    return { ...question, all_answers: newAnswers };
  });
  setScore(correctCount);
  setQuizQuestions(updatedQuestions);
  setQuizChecked(true);   
}
// function per iniziare una nuova partita
function playAgain(){

  setQuizStart(false);

  setQuizChecked(false);
  
  setScore(0);

  setNewGame(prevGame => !prevGame)
  
}

  return (

    <div className='main-container'>
       
     {!quizStart?
     <Intro startQuiz={go} />: 

     <div className={quizChecked ? 'quiz-container quiz-checked' : 'quiz-container'}>
      <h2 className='quiz-title'>Answer all the questions below: </h2>
      
          {quizQuestions.length > 0 ? (
              questionElements
            ) : (
              <p>Caricamento domande...</p>
            )}
        {!quizChecked ? (
          <button 
            className={`check-answers-btn ${checkAnswersDisabled ? "disabled" : null}`}
            disabled={checkAnswersDisabled}
            onClick={checkAnswers}
          >
            Check Answers
          </button>
        ) : (
          <div className="results-container">
            <p className="score-text">
              Risposte corrette: {score}/{quizQuestions.length}
            </p>
            <button 
              className="play-again-btn"
              onClick={playAgain}
            >
              Play Again
            </button>
          </div>
        )}
     </div>

     }
    </div>
  )
  
}

export default App
