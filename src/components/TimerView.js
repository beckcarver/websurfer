// Beckham Carver
// Web App COSC4220, UWYO
// TimerView, displays and updates timer

import React, { useRef, useState, useEffect } from "react";
import "98.css";

// Code started from geeksforgeeks https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/

export default function TimerView({
  signalOutOfTime: signalOutOfTime = f => f,
  refresh: refresh
}) {

  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total =
      Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(
      (total / 1000 / 60) % 60
    );

    return {
      total,
      minutes,
      seconds,
    };
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("01:01");
    let stopSignaling = false;

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      let { total, minutes, seconds } =
        getTimeRemaining(e);
      if (total >= 0) {
        // update the timer
        // check if less than 10 then we need to
        // add '0' at the beginning of the variable
        setTimer(
          (minutes > 9
            ? minutes
            : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
        );
      }
      else if (!stopSignaling) {
        signalOutOfTime()
        stopSignaling = true;
      }
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 61);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    console.log("Reset timer signal recieved")
    clearTimer(getDeadTime());
  }, [refresh]);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };


  return (
    <div style={{ minHeight: "15vh" }} className="window">
      <div className="title-bar inactive">
        <div className="title-bar-text">Counter</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>

      <div className="window-body">
        <h1 style={{ textAlign: "center" }}>{timer}</h1>
        <div className="field-row" style={{ justifyContent: "center" }}>
          <button onClick={onClickReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};