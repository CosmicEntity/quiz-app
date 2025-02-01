import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full md:w-[80%] border-2 border-gray-500 p-4 m-2 sm:m-8 rounded shadow-md">
        <div className="flex justify-center items-center">
          <h1 className=" text-2xl sm:text-3xl text-teal-700 text-center sm:text-left">
            404 Not Found
          </h1>
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

export default NotFound;
