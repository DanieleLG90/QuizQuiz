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

    
    React.useEffect (() =>{
      fetch("https://opentdb.com/api.php?amount=6&type=multiple")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setQuizQuestions(data)
    })
    }, [])

    
  
  return (
    <>
     <h1>Quiz Quiz Game</h1>
     {!quizStart?
     <Intro startQuiz={go} />: 

     <div>
      <h2>answer all the questions below: </h2>
      <div>
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
     </div>

     }
    </>
  )
}

export default App
