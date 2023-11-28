// Beckham Carver
// Web App COSC4220, UWYO
// Form for sending current session related data to DB, part of UploadView

import React, { useEffect, useState } from "react";
import "98.css"

export default function UploadForm({ 
    score: score,
    closeForm : closeForm = f => f, 
}) {

    return (
        <div className="ScoreForm" style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%))"
        }}>
            <div style={{ minHeight: "60vh" }} className="window">
                <div className="title-bar">
                    <div className="title-bar-text">Upload Your Score!</div>
                    <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" onClick={()=>closeForm(false)}/>
                </div>
                </div>
                <div className="window-body">
                    <p>Your score is <strong>{score}</strong></p>
                    <form className="scoreForm">
                        <input
                            style={{ width: "60%" }}
                            type="text"
                            placeholder="Name"
                            required
                        />
                        <input
                            type="submit"
                            value="Search"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}