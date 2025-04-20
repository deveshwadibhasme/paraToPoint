import React from "react";

const PointsContainer = ({ title, points }) => {
  return (
    <div className="flex-1 flex flex-col gap-2 min-h-52">
      <h2 className="text-4xl font-bold text-gray-800 drop-shadow-md">
        {title} Points
      </h2>
      {points.map((point, index) => (
        <div
          key={index}
          className="bg-white p-2 border border-gray-300 mt-1 rounded-lg shadow-md relative"
        >
          <button className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white py-2 px-4 rounded-lg hover:scale-105 transform transition-transform duration-100 shadow-md cursor-pointer absolute top-2 right-2">
            Copy
          </button>
          <p>{point}</p>
        </div>
      ))}
    </div>
  );
};

export default PointsContainer;
