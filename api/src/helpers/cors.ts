import cors from "cors";

// CORS Configuration
const allowedOrigins: string[] = [
  "http://127.0.0.1:3001",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://127.0.0.0",
  "http://127.0.0.1:8080",
  "https://live-score-tblaymire1994.vercel.app",
];

export const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};
