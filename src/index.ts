import express from "express";
import profileRoutes from './routes/profile.routes';

const app = express();

app.use(express.json());
app.disable("x-powered-by");

app.use('/profiles', profileRoutes);

if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT , () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

export default app;