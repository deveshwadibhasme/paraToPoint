import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY; // store in .env file

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: API_KEY });
export default async function getSewaPoints(paragraph) {

    const prompt = `
    You are helping format sewa content for social media.
    Take the following paragraph which contains multiple mixed-up sewa points and hashtags, and do the following:
    1. Break it into clear, individual sewa points.
    2. For each point, generate proper Instagram hashtags.
    3. Then generate a shortened version of the same for Twitter (max 280 characters per point, including hashtags).
    4.Don't include any other text or explanation, just the formatted output without any other code block like "json".
    5.Output should be a JSON object with two keys: "instagram" and "twitter".


    Output should be:
    {
      "instagram": [
        "Point 1...\n#tag1 #tag2",
        "Point 2...\n#tag3 #tag4"
      ],
      "twitter": [
        "Point 1 short... #tag1 #tag2",
        "Point 2 short... #tag3 #tag4"
      ]
    }
      
    Input paragraph:
    "${paragraph}"
  `;


  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    if (response &&  response.text) {
      return response.text; // Adjusted to access the correct property
    } else {
      console.warn("No data or output returned from AI model.");
      return null;
    }
  } catch (error) {
    console.error("Error generating content:", error.message);
    return null;
  }
}

