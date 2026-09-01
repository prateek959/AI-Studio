import express from "express";
import dotenv from "dotenv";
import fullPipeLinerouter from "./routes/fullPipelineRoutes.js";
import db from "./config/connection.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors";
import cron from 'node-cron';
import failedVideoController from "./controllers/failedVideoController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
  "http://localhost:5173",
  "https://ai-studio-three-blue.vercel.app",
],
  credentials:true,
   allowedHeaders: ["Content-Type", "Authorization"]
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/storage/output', express.static(path.join(__dirname, "storage", "output")));


app.use('/auth', authRoutes);
app.use("/video", fullPipeLinerouter);


cron.schedule('*/2 * * * *', async () => {
  console.log("Process start");
  await failedVideoController();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {

  console.log(`Server running on port ${PORT}`);
  await db();

});