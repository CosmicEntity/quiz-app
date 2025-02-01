import React from "react";
import { useNavigate } from "react-router";

const QuizTile = ({ id, title, topic, questions_count, duration }) => {
  const navigate = useNavigate();
  const handleQuiz = () => {
    navigate(`/quiz/${id}`);
  };
  return (
    <div className="max-w-xs p-4 my-4 bg-white border border-gray-500 rounded-lg shadow-md ">
      <h5 className="mb-1 text-lg font-bold text-teal-700 ">{title}</h5>

      <p className="mb-3 text-sm sm:text-md font-normal text-gray-700">
        Topic : {topic}
      </p>

      <div className="flex justify-between mb-2">
        <p className="text-sm sm:text-md text-gray-700">
          Questions: {questions_count}
        </p>
        <p className="text-sm sm:text-md text-gray-700">
          Duration: {duration} min.
        </p>
      </div>
      <div className="w-full flex justify-center sm:justify-start">
        <button
          className="w-24 p-1 text-white bg-teal-700 rounded-lg  hover:bg-teal-800 focus:ring-4 focus:outline-none hover:cursor-pointer"
          onClick={handleQuiz}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default QuizTile;
