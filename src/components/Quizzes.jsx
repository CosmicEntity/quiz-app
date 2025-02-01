import React from "react";
import { data } from "../data";
import QuizTile from "./QuizTile";

const Quizzes = () => {
  const { id, title, topic, questions_count, duration } = data;
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full md:w-[80%] border-2 border-gray-500 p-4 m-2 sm:m-8 rounded shadow-md">
        <h1 className="border-b-2 border-gray-500 text-3xl text-teal-700 text-center sm:text-left">
          Quizzes
        </h1>
        <div className="flex flex-col items-center justify-between sm:items-start sm:flex-row sm:flex-wrap">
          <QuizTile
            id={id}
            title={title}
            topic={topic}
            questions_count={questions_count}
            duration={duration}
          />
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
