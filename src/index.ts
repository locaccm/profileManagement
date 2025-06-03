import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile.routes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use("/profiles", profileRoutes);
setupSwagger(app);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {});
}

export default app;
