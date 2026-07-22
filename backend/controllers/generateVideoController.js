import { createFinalVideocheck } from "../check/createFinalVideocheck.js";
import Failed from "../models/failedSchema.js";
import Video from "../models/videoSchema.js";
import { createFinalVideo } from "../services/mergeService.js"



export const videoGenerater = async (req, res, next) => {
    try {
        const filename = await createFinalVideo(req.content.audio, req.user.id);
        const url = `${req.protocol}://${req.get("host")}/storage/output/${req.user.id}/${filename}`
        await Video.create({
            userID: req.user.id,
            title: req.content.title,
            description: req.content.description,
            hashtags: req.content.hashtags.split(' '),
            VideoURL: url
        });

        // console.log("Generate Video Done");
        req.content.VideoURL = url;

        res.status(200).json({
            ...req.content,
            VideoURL: url
        });
    } catch (error) {
        console.error("Video Controller Error:", error);
        await Failed.create({
            userID:req.user.id,
            audio:req.content.audio,
            scenes:req.content.scenes,
            script:req.content.script,
            title:req.content.title,
            description:req.content.description,
            hashtags:req.content.hashtags.split(" "),
            sceneGenerated:true,
            clipGenerated:true,
            baseURL:`${req.protocol}://${req.get("host")}`
        });
        next(error)
    }
}