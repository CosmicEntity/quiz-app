import React from "react";
import { useNavigate } from "react-router";
import { useScoreStore } from "../store";
import { data } from "../data";
const Result = () => {
  const score = useScoreStore((state) => state.score);
  const correctAnswers = useScoreStore((state) => state.correctAnswers);
  const wrongAnswers = useScoreStore((state) => state.wrongAnswers);
  const { questions_count, correct_answer_marks, negative_marks } = data;
  const navigate = useNavigate();
  const handleHome = () => navigate("/");

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full md:w-[80%] border-2 border-gray-500 p-4 m-2 sm:m-8 rounded shadow-md">
        <div className="border-b-2 border-gray-500 flex justify-center items-center">
          <h1 className=" text-2xl sm:text-3xl text-teal-700 text-center sm:text-left">
            Result
          </h1>
        </div>
        <div className="w-3/4 sm:w-[80%] my-4 text-md sm:text-lg mx-auto p-4 flex flex-col sm:flex-row gap-2 justify-between items-center border-2 border-gray-500 rounded shadow-md">
          <p>Score: {score} / 40</p>
          <p>
            Correct: {correctAnswers} / {questions_count}
          </p>
          <p>
            Wrong: {wrongAnswers} / {questions_count}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <p className="text-md sm:text-lg">
            Marks per Question (correct : wrong){" "}
          </p>
          <p>
            <span className="text-teal-700">+{correct_answer_marks}</span> :{" "}
            <span className="text-red-700">-{negative_marks}</span>
          </p>
        </div>
        <div
          className="w-full my-2 flex justify-center items-center"
          onClick={handleHome}
        >
          <button className="w-24 p-1 text-white bg-teal-700 rounded  hover:bg-teal-800 focus:ring-4 focus:outline-none hover:cursor-pointer">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
