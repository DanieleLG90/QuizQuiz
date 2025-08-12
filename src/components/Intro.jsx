import React from "react"


export default function Intro(props){
    return(
        <div className="intro-container">
            <h1>Quiz Quiz Game</h1>
            <p>Metti alla prova la tua conoscenza!</p>
            <button onClick={props.startQuiz}>Iniziamo</button>
        </div>
    )
}