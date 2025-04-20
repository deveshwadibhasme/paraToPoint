import express from 'express';
import cors from 'cors'; // Import cors
import getSewaPoints from './utils/gemini.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use CORS middleware
app.use(cors({ origin: '*' }));

// Route: /api/gemini
app.post('/api/gemini', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: "Request body is missing or empty." });
        }
        
        const response = await getSewaPoints(req.body.paragraph); // Call the function and assign the result
        return res.status(200).send(response);
    } catch (error) {
        console.error("Error occurred while processing Gemini request:", error.message);
        return res.status(500).send({ error: "An error occurred while processing your request." });
    }
});

// Listen on port 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});