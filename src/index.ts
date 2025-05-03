import express from "express";
import profileRoutes from "./routes/profile.routes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.disable("x-powered-by");

app.use("/profiles", profileRoutes);
setupSwagger(app);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 Swagger docs on http://localhost:${PORT}/api-docs`);
  });
}

export default app;
