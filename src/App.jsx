import React from "react";
import { Routes, Route } from "react-router";
import Quizzes from "./components/Quizzes";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Quizzes />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
