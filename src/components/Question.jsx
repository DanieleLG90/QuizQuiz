import React from "react"
import "./Question.css"


export default function(props){
    
    function handleAnswerClick(answerText) {
        props.handleSelectAnswer(props.question.id, answerText);
    }

    function handleClick(answerText){
        setSelectedAnswer(answerText)
    }

    const answerElements = props.question.all_answers.map(answer =>{
         const isSelected = answer.isSelected; // Usiamo lo stato del genitore
        const btnClass = isSelected? "answer-button selected" : "answer-button"

        return(
            <button
                key={answer.id}
                className={btnClass}
                onClick={() => handleAnswerClick(answer.text)}
            >
                {answer.text}
            </button>
        )
    })
     
    return(
        <div className="question-container">
            <h3>{props.question.question}</h3>
            <div className="answers-container">
               {answerElements}
            </div>
        </div>
    )
}
