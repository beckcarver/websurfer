// Beckham Carver
// Web App COSC4220, UWYO
// 
// Viewport and fetch logic for Trivia section in app.
// Hosts windows for score, guessing, question information, and upload.
// 
// Fetches a local session token for user to mitigate overloading opentdb.com api
// Uses token to make requests for additional trivia questions when needed.
//
// Communicates with TimerView through App.js
// Hosts upload view

import React, { useState, useEffect } from "react";
import TriviaSubmit from "./TriviaSubmit";
import TriviaScore from "./TriviaScore";
import UploadView from "./UploadView";
import "98.css"

const initialJson = {
    "response_code": 99,
    "results":
        [
            { "type": "waiting..." },
            { "difficulty": "waiting..." },
            { "category": "waiting..." },
            { "question": "waiting..." },
            { "correct_answer": "waiting..." },
            { "incorrect_answers": ["wating..."] },

            { "type": "waiting 2..." },
            { "difficulty": "waiting 2..." },
            { "category": "waiting 2..." },
            { "question": "waiting 2..." },
            { "correct_answer": "waiting 2..." },
            { "incorrect_answers": ["wating 2..."] }
        ]
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export default function TriviaView({ 
    onNewQuestion : onNewQuestion = f => f,
    outOfTime : timeSignal
}) {
    const [questionNum, setQuestionNum] = useState(0)
    const [tokenState, setToken] = useState("");
    const [triviaJson, setTrivia] = useState(initialJson);
    const [correctGuesses, setCorrect] = useState(0);

    const fetchToken = async () => {
        try {
            const response = await fetch("https://opentdb.com/api_token.php?command=request")
            if (!response.ok) {
                throw new Error("API response was not OK")
            }
            const data = await response.json();
            setToken(data["token"]);
            console.log(tokenState)
            fetchTrivia(data["token"])
        } catch (error) {
            console.error("Error", error)
        }
    }

    const fetchTrivia = async (token) => {

        console.log("Fetching with: " + token)

        if (token.length > 0) {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&token=${token}`)
                if (!response.ok) {
                    throw new Error("API response was not OK")
                }
                const data = await response.json();
                setTrivia(data);
                console.log(data)
                setQuestionNum(0);
            } catch (error) {
                console.error("Error", error)
            }
        }
        else {
            console.error("Error", "Token not of valid length")
        }
    }

    useEffect(() => {
        console.log("TriviaView rendered")
        if (tokenState.length === 0) {
            fetchToken()
        }
        onNewQuestion()
    }, [questionNum]);

    useEffect(() => {
        console.log("TriviaView rendered")
        if (timeSignal != 0) {
            console.log("Time signal received")
            setCorrect(correctGuesses - 1)
        }
    }, [timeSignal]);

    const checkGuess = (guess) => {
        let lowerGuess = guess.toLowerCase();
        let lowerAnswer = triviaJson["results"][questionNum]["correct_answer"].toLowerCase()
        console.log(`guess is: ${lowerGuess}, answer is: ${lowerAnswer}`)

        if (lowerGuess.includes(lowerAnswer)) {
            setCorrect(1 + correctGuesses);
            if (questionNum >= 9) {
                fetchTrivia(tokenState)
            }
            else {
                setQuestionNum(1 + questionNum);
            }
        }
    }

    const skipQuestion = () => {
        console.log(`Skip question (${questionNum})`)
        if (questionNum >= 9) {
            fetchTrivia(tokenState)
        }
        else {
            setQuestionNum(1 + questionNum);
        }
    }

    return (
        <div className="TriviaView">
            <TriviaScore score={correctGuesses} />
            <UploadView score={correctGuesses} />
            <div style={{ paddingTop: "1vh" }}></div>

            <div className="window" style={{ minHeight: "50vh" }}>

                <div className="title-bar">
                    <div className="title-bar-text">Trivia Maker 93</div>
                    <div className="title-bar-controls">
                        <button aria-label="Help" onClick={() => alert("The \"Trivia Maker 93\" gives out multiple choice questions- but you don't know the choices! Use the Wikipedia box to help you find the answer.")} />
                        <button aria-label="Close" onClick={skipQuestion} />
                    </div>
                </div>

                <div style={{ paddingTop: "20px" }}></div>
                <TriviaSubmit onNewGuess={checkGuess} />
                <div style={{ paddingTop: "20px" }}></div>

                <hr style={{ color: "black", backgroundColor: "black", height: 1 }} />

                <div className="window-body">
                    <p><strong>Type: </strong>{triviaJson["results"][questionNum]["type"]}</p>
                    <p><strong>Difficulty: </strong>{triviaJson["results"][questionNum]["difficulty"]}</p>
                    <p><strong>Category: </strong>{decodeHtml(triviaJson["results"][questionNum]["category"])}</p>
                    <p className="questionText">{decodeHtml(triviaJson["results"][questionNum]["question"])}</p>

                    {(tokenState.length > 0) && <p style={{ textAlignLast: "center" }}>Token: {tokenState}</p>}
                    {(tokenState.length === 0) && <p style={{ textAlignLast: "center" }}>Token: is loading</p>}
                </div>

            </div>
        </div>

    );
}