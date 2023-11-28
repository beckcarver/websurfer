// Beckham Carver
// Web App COSC4220, UWYO
// Main app, implements the 3/4 views (UploadView is in TriviaView)
// and sets them into their grid components (see style.css)

import React, { useState }from "react";
import TriviaView from "./components/TriviaView";
import WikiView from "./components/WikiView";
import TimerView from "./components/TimerView";
import "./styles.css";

function App() {
  // Imperative handle sucks, this works though, https://stackoverflow.com/questions/37949981/call-child-method-from-parent
  const [refreshTimer, signalRefresh] = useState(0);
  const [outOfTime, signalOutOfTime] = useState(0);

  return (
    <div className="App">
      <noscript>You need to enable JavaScript to run this app.</noscript>

      <div className="grid-container">

        <div className="header">
          <h1>Wiki Surfer</h1>
        </div>

        <div className="left">
          <TriviaView outOfTime={outOfTime} onNewQuestion={() => signalRefresh(prev => prev + 1)} />
          <div style={{ paddingTop: "1vh" }}></div>
          <TimerView signalOutOfTime={() => signalOutOfTime(prev => prev + 1)} refresh={refreshTimer} />
        </div>

        <div className="middle">
          <WikiView />
        </div>

        <div className="footer">
          <p>f o o t</p>
        </div>

      </div>

    </div>
  );
}

export default App;
