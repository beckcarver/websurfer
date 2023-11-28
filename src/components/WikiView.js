// Beckham Carver
// Web App COSC4220, UWYO
// 
// Stores Wikipedia query information, and displays converted HTML
// Uses two API fetches, one that takes a keywoard and returns the most related page
// the second returns the parse information for that page.


import React, { useState, useEffect } from "react";
import WikiSubmit from "./WikiSubmit";
import parse from "html-react-parser"


export default function WikiView() {

    const [pageID, setPageID] = useState("");

    const [wikiJson, setWikiJson] = useState({
        "parse": {
            "displaytitle" : "<h3>Wikipedia</h3>",
            "title": "Waiting...",
            "pageid": 0,
            "revid": 0,
            "text": {
                "*": "<h4>Waiting for query...</h4>"
            }
        }
    });

    var queryString = "";

    const fetchWikiSearch = async () => {
        console.log(`Searching API with: ${queryString}`)
        try {
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${queryString}`)
            if (!response.ok) {
                console.log(response)
                throw new Error("API response was not OK");
            }
            const data = await response.json();
            console.log(data);
            console.log("pageID from data: " + data["query"]["search"][0]["pageid"]);
            setPageID(data["query"]["search"][0]["pageid"]);

        } catch (error) {
            console.error("Error", error);
        }
    }



    const fetchWikiPage = async (id) => {
        console.log(`Fetching Page API with: ${id}`)
        try {
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&pageid=${id}`)
            if (!response.ok) {
                throw new Error("API response was not OK");
            }
            const data = await response.json();
            setWikiJson(data);
            console.log(data);
        } catch (error) {
            console.error("Error", error);
        }
    }


    useEffect(() => {
        console.log("useEffect pageID: " + pageID);
        if (pageID.toString().length > 0) {
            fetchWikiPage(pageID);
        }
    }, [pageID]);

    const setQuery = (search) => {
        queryString = search;
        fetchWikiSearch(search);
    }

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Counter</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize" />
                    <button aria-label="Maximize" />
                    <button aria-label="Close" />
                </div>
            </div>
            <div className="window-body">

                <WikiSubmit onNewQuery={setQuery} />
                <hr style={{ color: "black", backgroundColor: "black", height: 3 }} />

                <div className="WikiHtml">
                    {parse(wikiJson["parse"]["text"]["*"])}
                </div>

            </div>
            
        </div>
    );
}