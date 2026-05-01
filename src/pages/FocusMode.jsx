import {
  useState,
  useEffect,
  useContext,
} from "react";

import Layout from "../components/Layout";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

function FocusMode() {

  const { darkMode } =
    useContext(ThemeContext);

  const [minutes, setMinutes] =
    useState(25);

  const [seconds, setSeconds] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [sessionsCompleted, setSessionsCompleted] =
    useState(() => {

      const savedSessions =
        localStorage.getItem(
          "focusSessions"
        );

      return savedSessions
        ? JSON.parse(savedSessions)
        : 0;
    });

  useEffect(() => {

    localStorage.setItem(
      "focusSessions",
      JSON.stringify(
        sessionsCompleted
      )
    );

  }, [sessionsCompleted]);

  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        setSeconds((prevSeconds) => {

          if (prevSeconds > 0) {

            return prevSeconds - 1;
          }

          if (minutes === 0) {

            clearInterval(timer);

            setIsRunning(false);

            setSessionsCompleted(
              (prev) => prev + 1
            );

            alert(
              "Focus Session Completed!"
            );

            return 0;
          }

          setMinutes(
            (prevMinutes) =>
              prevMinutes - 1
          );

          return 59;
        });

      }, 1000);
    }

    return () =>
      clearInterval(timer);

  }, [isRunning, minutes]);

  function startTimer() {

    if (
      minutes === 0 &&
      seconds === 0
    ) {

      setMinutes(25);
      setSeconds(0);
    }

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

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.3,
        }}

      >

        <h1 className="text-3xl font-bold mb-8">
          Focus Mode
        </h1>

        <div
          className={`rounded-2xl shadow p-10 flex flex-col items-center ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-7xl font-bold mb-8">

            {String(minutes).padStart(
              2,
              "0"
            )}

            :

            {String(seconds).padStart(
              2,
              "0"
            )}

          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8">

            <button
              onClick={startTimer}
              disabled={isRunning}
              className={`px-6 py-3 rounded-xl text-white transition ${
                isRunning
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Start
            </button>

            <button
              onClick={pauseTimer}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition"
            >
              Pause
            </button>

            <button
              onClick={resetTimer}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
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

      </motion.div>

    </Layout>

  );
}

export default FocusMode;