import { useState, useEffect } from "react";

import Layout from "../components/Layout";

function FocusMode() {

  const [minutes, setMinutes] = useState(25);

  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const [sessionsCompleted, setSessionsCompleted] =
    useState(() => {

      const savedSessions =
        localStorage.getItem("focusSessions");

      return savedSessions
        ? JSON.parse(savedSessions)
        : 0;
    });

  useEffect(() => {

    localStorage.setItem(
      "focusSessions",
      JSON.stringify(sessionsCompleted)
    );

  }, [sessionsCompleted]);

  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        if (seconds > 0) {

          setSeconds(seconds - 1);

        } else {

          if (minutes === 0) {

            clearInterval(timer);

            setIsRunning(false);

            setSessionsCompleted(
              (prev) => prev + 1
            );

            alert("Focus Session Completed!");

          } else {

            setMinutes(minutes - 1);

            setSeconds(59);
          }
        }

      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isRunning, minutes, seconds]);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {

    setIsRunning(false);

    setMinutes(25);

    setSeconds(0);
  }

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-8">
        Focus Mode
      </h1>

      <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center">

        <h2 className="text-7xl font-bold mb-8">

          {String(minutes).padStart(2, "0")}:

          {String(seconds).padStart(2, "0")}

        </h2>

        <div className="flex gap-4 mb-8">

          <button
            onClick={startTimer}
            className="bg-green-500 text-white px-6 py-3 rounded-xl"
          >
            Start
          </button>

          <button
            onClick={pauseTimer}
            className="bg-yellow-500 text-white px-6 py-3 rounded-xl"
          >
            Pause
          </button>

          <button
            onClick={resetTimer}
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Reset
          </button>

        </div>

        <div className="text-xl">

          Sessions Completed:
          {" "}
          <span className="font-bold">
            {sessionsCompleted}
          </span>

        </div>

      </div>

    </Layout>
  );
}

export default FocusMode;