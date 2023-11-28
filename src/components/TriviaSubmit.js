// Beckham Carver
// Web App COSC4220, UWYO
// Submit form for TriviaView, takes in guess and passes upward

import React from "react";
import { useInput } from "./hooks";

export default function TriviaSubmit({onNewGuess = f => f})
{
    const [guessProps,resetguess] = useInput("");

    const submit = e =>
    {
        console.log(`New guess: ${guessProps.value}`)
        e.preventDefault();
        onNewGuess(guessProps.value);
        resetguess("");
    };
    return(
        <form onSubmit={submit} className="triviaForm">
            <input
                style={{width:"60%"}}
                className="triviaGuessText"
                {...guessProps}
                type="text"
                placeholder="Enter guess..."
                required
            />
            <input
                className="triviaSubmit"
                type="submit"
                value="Submit"
            />
        </form>
    );

}