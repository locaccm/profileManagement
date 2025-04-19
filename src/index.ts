import express from "express";
import profileRoutes from './routes/profile.routes';

const app = express();


app.use('/profiles', profileRoutes);
