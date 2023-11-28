// Beckham Carver
// Web App COSC4220, UWYO
// View for creating the upload form, hosted in TriviaView

import React, { useEffect, useState } from "react";
import "98.css"
import UploadForm from "./UploadForm";

export default function UploadView(
    { score }
) {

    const [form, setForm] = useState(false);

    useEffect(() => {
        console.log("UploadView rendered")
      }, [form]);

    return (
        <div className="window">
            <div className="window-body">
                <div className="field-row" style={{ justifyContent: "right" }}>
                    <button onClick={()=>setForm(true)}>Upload</button>
                    {form == true && <UploadForm score={score} closeForm={(b) => setForm(b)} />}
                </div>
            </div>
        </div>
    );
}