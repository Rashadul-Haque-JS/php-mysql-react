import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-start justify-center rounded-sm">
      <div className="bg-secondary  p-6 rounded-lg shadow-md text-center mt-4">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome To Your Smart Idea Tracker
        </h1>
        <p className="text-[#F0E8C4]">Handle All Eureka Moments</p>
        <div className="relative">
          <img
            src="/tasks.png" // Replace with the actual path to your image
            alt="Task Management"
            className="mt-8 mx-auto w-auto max-w-sm h-[440px] xs:h-[380] sm:h-[400]"
          />

          <Link
            to={"/create-task"}
            className="bg-orange-300 absolute top-[16%] left-[33%] sm:left-[32.5%] xs:left-[30.5%] shadow-md rounded-full p-2 w-16 h-16 flex items-center justify-center current-display spinning"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
          <Link to={"/tasks"} className="bg-orange-300 absolute bottom-[4.5%] left-[40.5%] sm:left-[39%] xs:left-[38%] shadow-md rounded-full p-2 w-16 h-16 flex items-center justify-center current-display spinning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <circle cx="4" cy="12" r="2" />
                <circle cx="4" cy="6" r="2" />
                <circle cx="4" cy="18" r="2" />
                <line
                  x1="8"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="8"
                  y1="6"
                  x2="20"
                  y2="6"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="8"
                  y1="18"
                  x2="20"
                  y2="18"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
