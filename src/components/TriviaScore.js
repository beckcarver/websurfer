// Beckham Carver
// Web App COSC4220, UWYO
// Window to display score, part of TriviaView

import React, { useEffect } from "react";
import "98.css"

export default function TriviaScore(
    { score }
) {

    useEffect(() => {
        console.log("TriviaScore rendered")
    }, [score]);

    return (
        <div style={{ minHeight: "5vh" }} className="window">
            <div className="title-bar inactive">
                <div className="title-bar-text">Score</div>
            </div>
            <div className="window-body">
                <h4 style={{ textAlign: "center" }}>{score}</h4>
            </div>
        </div>
    );
}