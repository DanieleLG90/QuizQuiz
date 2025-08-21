import React from "react"
import "./Question.css"


export default function(props){
    
    function handleAnswerClick(answerText) {
        props.handleSelectAnswer(props.question.id, answerText);
    }

    const answerElements = props.question.all_answers.map(answer =>{
        const isSelected = answer.isSelected; // Usiamo lo stato del genitore
        const isCorrect = answer.isCorrect;
        const isIncorrect = answer.isIncorrect;

        let buttonClass = "answer-button";
        if (isSelected) buttonClass += " selected";
        if (isCorrect) buttonClass += " correct";
        if (isIncorrect) buttonClass += " incorrect";

        return(
            <button
                key={answer.id}
                className={buttonClass}
                onClick={() => handleAnswerClick(answer.text)}
                disabled={props.quizChecked}
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
