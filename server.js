import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import silderRoute from './route/sliderRoute.js';
import courseRoutes from './route/courseRoute.js'
import universityRoutes from './route/universityRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/sliders', silderRoute);
app.use('/api/courses', courseRoutes);
app.use('/api/universities', universityRoutes);

app.use(express.static(path.join(__dirname, 'dist')));
    
// For any route not handled by backend API, serve index.html (for React Router)
// Important: This should come AFTER all API routes
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
