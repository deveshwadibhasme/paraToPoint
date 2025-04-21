import React from "react";

const PointsContainer = ({ title, points ,colour}) => {

  const copyIt = (e) => {
    const pointText = e.target.parentElement.querySelector("p").innerText;
    navigator.clipboard.writeText(pointText).then(() => {
      alert("Point copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  }

  return (
    <div className={`flex-1 flex flex-col gap-2 min-h-10 `}>
      <h2 className="text-4xl font-bold text-gray-800 drop-shadow-md">
        {title} Points
      </h2>
      {points.map((point, index) => (
        <div
          key={index}
          className={`${colour} p-2 border border-gray-300 mt-1 rounded-lg shadow-md relative pb-15`}
        >
          <p>{point}</p>
          <button onClick={copyIt} className="bg-gray-400 text-white active:bg-green-400 h-9 px-5 rounded-lg hover:scale-102 transform transition-transform duration-100 shadow-xl cursor-pointer absolute bottom-2 right-1/2 translate-x-1/2">
            Copy
          </button>
        </div>
      ))}
    </div>
  );
};

export default PointsContainer;
