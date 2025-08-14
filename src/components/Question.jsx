import React from "react"


export default function(props){
    
    const [selectedAnswer, setSelectedAnswer] = React.useState(null)

    function handleClick(answerText){
        setSelectedAnswer(answerText)
    }

    const answerElements = props.question.all_answers.map(answer =>{
        const isSelected = selectedAnswer === answer.text 
        const btnClass = isSelected? "answer-button selected" : "answer-button"

        return(
            <button
            key={answer.id}
            className={btnClass}
            onClick={() => handleClick(answer.text)}>
                {answer.text}
            </button>
        )
    })
     
    return(
        <div className="question-container">
            <h3>{props.question.question}</h3>
            <div className="answer-container">
               {answerElements}
            </div>
        </div>
    )
}
