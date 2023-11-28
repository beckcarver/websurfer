// Beckham Carver
// Web App COSC4220, UWYO
// Query/Search form for Wikipedia API, gets string and passes to WikiView

import React from "react";
import { useInput } from "./hooks";

export default function WikiSubmit({onNewQuery = f => f})
{
    const [queryProps,resetQuery] = useInput("");

    const submit = e =>
    {
        console.log(`New query: ${queryProps.value}`)
        e.preventDefault();
        onNewQuery(queryProps.value);
        resetQuery("");
    };
    return(
        <form onSubmit={submit} className="wikiForm">
            <input
                style={{width:"60%"}}
                className="wikiSearchText"
                {...queryProps}
                type="text"
                placeholder="Enter Wikipedia Search"
                required
            />
            <input
                className="wikiSubmit"
                type="submit"
                value="Search"
            />
        </form>
    );

}