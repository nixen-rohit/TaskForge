import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/protected", authenticate, (req: any, res) => {
  res.json({
    message: "You accessed protected route 🎉",
    userId: req.userId,
  });
});


app.get("/", (req, res) => {
  res.json({ message: `API is running 🚀  ` });
  console.log(process.env.DATABASE_URL);
});
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/ `);
});