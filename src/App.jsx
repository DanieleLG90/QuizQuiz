import React from 'react'

import Intro from "./components/Intro"
import Question from "./components/Question"

import './App.css'

function App() {

  const [quizStart, setQuizStart] = React.useState(false)

    function go() {
      setQuizStart(true)
    }
  
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
