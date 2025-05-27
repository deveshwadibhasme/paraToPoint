// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import getSewaPoints from './utils/gemini.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://paratopoint.vercel.app';

app.use(helmet());

app.use(morgan('combined'));

app.use(express.json());

app.use(cors({
     origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000', 
            'https://paratopoint.vercel.app',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/gemini', apiLimiter);

app.post('/api/gemini', async (req, res) => {
    try {
        if (!req.body || typeof req.body.paragraph !== 'string' || req.body.paragraph.trim() === '') {
            return res.status(400).send({ error: "Request body must contain a non-empty 'paragraph' string." });
        }

        const geminiResponse = await getSewaPoints(req.body.paragraph);

        return res.status(200).send(geminiResponse);
    } catch (error) {
        console.error(`Error processing Gemini request: ${error.message}`);
        return res.status(500).send({ error: "An internal server error occurred while processing your request." });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
    console.log(`CORS origin set to: ${CORS_ORIGIN}`);
});