import React from 'react'
import he from 'he';
import Intro from "./components/Intro"
import Question from "./components/Question"

import './App.css'

function App() {

  const [quizStart, setQuizStart] = React.useState(false)
  const [quizQuestions, setQuizQuestions] = React.useState([])

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
    }, [])

    const questionElements = quizQuestions.map(question => (
    <Question 
      key={question.id}
      question={question}
    />
  ));

    
  
  return (
    <div className='main-container'>
     
     {!quizStart?
     <Intro startQuiz={go} />: 

     <div>
      <h2>answer all the questions below: </h2>
      <div>
          
          {quizQuestions.length > 0 ? (
              questionElements
            ) : (
              <p>Caricamento domande...</p>
            )}
        </div>
     </div>

     }
    </div>
  )
}

export default App
