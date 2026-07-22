import { error } from "console";
import Failed from "../models/failedSchema.js";
import { generateSceneQueries } from "../services/sceneService.js";
import { getVideo } from "../services/videoService.js";
import axios from "axios";
import fs from "fs";
import path from 'path'


export const downloadVideo = async (url, name, userID) => {

  const clipsDir =
    `storage/clips/${userID}`;

  if (!fs.existsSync(clipsDir)) {

    fs.mkdirSync(clipsDir, {
      recursive: true
    });
  }

  const res = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });


  const videoPath = `${clipsDir}/${name}.mp4`;


  const writer = fs.createWriteStream(videoPath);

  res.data.pipe(writer);


  return new Promise((resolve, reject) => {

    writer.on("finish", resolve);

    writer.on("error", reject);
  });
};

// clean script
export const cleanScript = (text) => {
  if (!text) return "";
  return text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
};

// split into scenes
export const splitScript = (script) => {
  return script
    .split(/[\.?\!]/)
    .map(line => line.trim())
    .filter(line => line.length > 15);
};


export const ScriptToScenesGenerater = async (req, res, next) => {
  try {

    const script = req.content.script;

    const clean = cleanScript(script);

    const scenes = splitScript(clean);

    // console.log("Scenes:", scenes);
    let structuredScenes = [];
    // 🔥 AI generate queries
    try {
      structuredScenes = await generateSceneQueries(scenes.slice(0, 5));

    } catch (error) {
      await Failed.create({
        userID: req.user.id,
        audio: req.content.audio,
        script: req.content.script,
        title: req.content.script,
        description: req.content.description,
        hashtags: req.content.hashtags.split(" "),
        baseURL: `${req.protocol}://${req.get("host")}`
      });
      console.log("Scene Generation Error:", error);
      return next(err);
    }
    req.content.scenes = structuredScenes;
    let count = 1;

    for (let item of structuredScenes) {
      try {
        // throw new Error();
        const videoUrl = await getVideo(item.query);

        if (videoUrl) {
          await downloadVideo(videoUrl, `clip${req.user.id}${count}`, req.user.id);
          // console.log(`${item.scene} → ${item.query}`);
          count++;
        }

      } catch (error) {
        await Failed.create({
          userID: req.user.id,
          audio: req.content.audio,
          scenes: structuredScenes,
          script: req.content.script,
          title: req.content.title,
          description: req.content.description,
          hashtags: req.content.hashtags.split(" "),
          sceneGenerated: true,
          baseURL: `${req.protocol}://${req.get("host")}`
        })
        const clipsDir = path.resolve(`storage/clips/${req.user.id}`);

        if (fs.existsSync(clipsDir)) {

          fs.rmSync(clipsDir, {
            recursive: true,
            force: true
          });

          console.log("Generated Clips Deleted");
        }
        console.log("Clip Error:", error);
        return next(error);
      }
    }

    // console.log( "All clips generated!");
    next();
  } catch (error) {
    console.error("Script to Scenes Controller Error:", error.message);
    next(error)
  }
}