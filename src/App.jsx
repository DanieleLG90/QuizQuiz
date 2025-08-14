import React from 'react'

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
          //console.log(data)
          //setQuizQuestions(data)
          const formattedQuestions = data.results.map(questionData => {
            // unione di tutte le risposte, giueste e sbagliate
            const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer]
            
            // Funzione per mescolare l'array
            
            // Mescola e mappa le risposte, aggiungendo un ID e `isSelected`
            const formattedAnswers = shuffleArray(allAnswers).map(answer => ({
              id: new Date().getTime() + Math.random(),
              text: answer,
              isSelected: false,
            }))

            // Restituisci un nuovo oggetto domanda che include i dati originali + le risposte formattate
            return {
              ...questionData, // Copia tutti i campi originali (es. `question`, `correct_answer`)
              id: new Date().getTime() + Math.random(), // Aggiungi un ID unico alla domanda
              all_answers: formattedAnswers, // Aggiungi il nuovo array di risposte
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
    <>
     <h1>Quiz Quiz Game</h1>
     {!quizStart?
     <Intro startQuiz={go} />: 

     <div>
      <h2>answer all the questions below: </h2>
      <div>
          {questionElements}
          {quizQuestions.length > 0 ? (
              questionElements
            ) : (
              <p>Caricamento domande...</p>
            )}
        </div>
     </div>

     }
    </>
  )
}

export default App
