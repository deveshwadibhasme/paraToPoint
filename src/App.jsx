import { useState } from "react";
import PointsContainer from "./components/PointsContainer";

function App() {
  const [points, setPoints] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState();


  const handleCount = () => {
    setCount((prev) => prev + 1);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    window.scrollTo({ top: e.target.getBoundingClientRect().height, behavior: "smooth" });

    setLoading(true);
    const form = e.target;
    const textArea = form.querySelector("textarea");
    const paragraph = textArea.value || "";

    const LOCAL_URL = "http://localhost:4000/api/gemini";
    const PUBLIC_URL =
      "https://paratopoint-production.up.railway.app/api/gemini";

  
    const response = await fetch(PUBLIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paragraph: paragraph }),
    });
    if (response.ok) {
      const data = await response.text();
      const formattedData = data.replace("```json", "").replace("```", "");
      const parsedData = JSON.parse(formattedData);
      setLoading(false);
      setPoints(parsedData);
    } else {
      console.error("Error formatting points");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl w-full min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 mx-auto flex flex-col items-center justify-start p-6">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 drop-shadow-md">
          Sewa Points Extracter
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full max-w-5xl mt-8 flex flex-col items-center"
        >
          <textarea
            className="max-w-5xl w-full bg-gray-50 text-gray-800 h-96 p-2 border border-gray-400 rounded-lg shadow-md outline-none resize-y hover:scale-101 transform transition-transform duration-300"
            placeholder="सत साहेब जी अपना पैराग्राफ यहां पेस्ट करें..."
            required
          ></textarea>
          <button
            type="submit"
            className="mt-8 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white py-2 px-2 rounded-lg w-35 text-xl font-bold shadow-md hover:scale-101 transform transition-transform duration-300"
          >
            Extract
          </button>
          <p className="text-red-700 mt-2">यह टूल गलती कर सकता है, पहले पढ़ें फिर कॉपी करें</p>
        </form>
        <div className="mt-8 flex flex-col md:flex-row justify-between w-full max-w-5xl text-center gap-8">
          {loading ? (
            <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md mx-auto">
              थोड़ा टाइम लगेगा तब तक जाप कर लिजिये....
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={handleCount}
                  className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105"
                >
                  👆🏻
                </button>
                <span
                  className="ml-4 text-xl font-bold text-gray-800 animate-bounce"
                  key={count}
                >
                  {count}
                </span>
              </div>
            </div>
          ) : (
            <>
              <PointsContainer
                title={"Twitter"}
                points={points?.twitter || []}
              />
              <PointsContainer
                title={"Instagram"}
                points={points?.instagram || []}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
