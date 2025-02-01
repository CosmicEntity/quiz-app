import React, { useState, useEffect } from "react";
import { useScoreStore } from "../store";
import { useParams, useNavigate } from "react-router";
import { data } from "../data";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const setScore = useScoreStore((state) => state.setScore);
  const setCorrectAnswers = useScoreStore((state) => state.setCorrectAnswers);
  const setWrongAnswers = useScoreStore((state) => state.setWrongAnswers);
  const quizData = data.id === Number(id) ? data : null;
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [index, setIndex] = useState(0);
  const { topic, questions, duration, questions_count } = quizData;
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const handleSelected = (idx) => {
    selected === idx ? setSelected(null) : setSelected(idx);
  };

  const handleAnswer = (idx, options) => {
    if (idx === null) return;
    setSubmitted(true);
    if (options[idx].is_correct) {
      setCorrect(idx);
      setScore(4);
      setCorrectAnswers();
    } else {
      idx = options.findIndex((option) => option.is_correct);
      setCorrect(idx);
      setScore(-1);
      setWrongAnswers();
    }
    setShowNext(true);
  };

  const handleNext = () => {
    setShowNext(false);
    setSubmitted(false);
    setSelected(null);
    setCorrect(null);
    if (index + 1 >= questions_count) {
      navigate("/result");
    } else {
      setIndex(index + 1);
    }
  };
  const handleQuit = () => {
    const ans = window.confirm(
      "Are you sure you want to quit? Your progress will be lost."
    );
    if (ans) {
      navigate("/");
    } else {
      return;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes}:${secondsRemaining.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    localStorage.removeItem("quiz-score-storage");
    useScoreStore.getState().resetScore();
    useScoreStore.persist.clearStorage();
    useScoreStore.persist.rehydrate();
    alert(
      "Don't use the back button or manually change the URL to navigate away from this page. Your progess will be lost."
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // handle time's up
        console.log("Time's up!");
      }
    }, 1000); // decrement time every second

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full md:w-[80%] border-2 border-gray-500 p-4 m-2 sm:m-8 rounded shadow-md">
        <div className="border-b-2 border-gray-500 flex flex-col justify-baseline items-center sm:flex-row sm:justify-between sm:items-baseline">
          <h1 className=" text-lg sm:text-3xl text-teal-700 text-center sm:text-left">
            {topic}
          </h1>
          <p className="text-sm font-medium sm:text-xl text-gray-700">
            Time Left: {formatTime(timeLeft)}
          </p>
        </div>
        <p className="my-2">
          Q{index + 1}. {questions[index].description}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {questions[index].options.map((option, idx) => {
            const op = ["A", "B", "C", "D"];
            return (
              <div
                key={option.id}
                className={`w-full p-2 border-2 ${
                  selected === null && "border-gray-700"
                } rounded hover:cursor-pointer  ${
                  selected === idx &&
                  !submitted &&
                  "bg-yellow-500 border-yellow-500 text-white"
                } ${
                  correct === idx &&
                  selected === idx &&
                  submitted &&
                  "bg-teal-700 text-white border-teal-700"
                } ${
                  correct !== idx &&
                  selected === idx &&
                  submitted &&
                  "bg-red-700 text-white border-red-700 hover:border-red-700"
                }
                  ${
                    correct === idx &&
                    selected !== idx &&
                    submitted &&
                    "bg-teal-700 text-white border-teal-700 hover:border-teal-700"
                  }`}
                onClick={!submitted ? () => handleSelected(idx) : null}
              >
                <button className="hover:cursor-pointer">
                  {op[idx]}: {option.description}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-between items-center  sm:flex-row sm:justify-center gap-2">
          <button
            className=" w-full sm:w-1/4 p-2 mt-2 text-white bg-teal-700 rounded hover:bg-teal-800 hover:cursor-pointer"
            onClick={
              !submitted
                ? () => handleAnswer(selected, questions[index].options)
                : null
            }
          >
            Check
          </button>
          <button
            className={`w-full sm:w-1/4 p-2 mt-2 text-white bg-gray-700 rounded hover:bg-gray-800 hover:cursor-pointer ${
              !showNext && "hidden"
            }`}
            onClick={handleNext}
          >
            Next
          </button>
          <button
            className={`w-full sm:w-1/4 p-2 mt-2 text-white bg-red-700 rounded hover:bg-red-800 hover:cursor-pointer`}
            onClick={handleQuit}
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
