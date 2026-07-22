import express from "express";
// import { generateContentPipeline } from "../controllers/FullPipelinecontroller.js";
import { ScriptGenerater } from "../controllers/generateScriptController.js";
import { voiceGenerater } from "../controllers/generateVoiceController.js";
import { ScriptToScenesGenerater } from "../controllers/generateScriptToScenesController.js";
import { videoGenerater } from "../controllers/generateVideoController.js";
import { checkToken } from "../middleware/authMiddleware.js";
import { myVideo, processVideo } from "../controllers/myPreviousVideoController.js";


const fullPipeLinerouter = express.Router();

fullPipeLinerouter.post("/generate",checkToken,ScriptGenerater, voiceGenerater, ScriptToScenesGenerater, videoGenerater);

fullPipeLinerouter.get('/myVideo',checkToken,myVideo);

fullPipeLinerouter.get('/process',checkToken,processVideo);

export default fullPipeLinerouter;