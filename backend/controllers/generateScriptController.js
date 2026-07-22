import Video from "../models/videoSchema.js";
import { generateDescription } from "../services/descriptionService.js";
import { generateHashtags } from "../services/hashtagService.js";
import { generateIdea } from "../services/ideaService.js";
import { generateScript } from "../services/scriptService.js";
import { generateTitle } from "../services/titleService.js";
import { getRandomTopic } from "../utils/getRandomTopic.js";



export const ScriptGenerater = async (req, res, next) => {
    try {
        let topic = req.body?.topic;

        if (!topic) {
            topic = getRandomTopic()
        }

        const idea = await generateIdea(topic);

        if (idea?.error) {
            return res.status(500).json({
                success: false,
                stage: "idea generation",
                provider: idea.provider,
                error: idea.message
            });
        }
        // console.log("Generated idea:", idea);

        const script = await generateScript(idea);
        // console.log(script, "script");
        if (script == "" || script?.error) {
            return res.status(500).json({
                success: false,
                stage: "script generation",
                provider: script.provider,
                error: script.message
            });
        }

        // console.log("Generated Script");

        const title = await generateTitle(script);

        if (title?.error) {
            return res.status(500).json({
                success: false,
                stage: "title generation",
                provider: title.provider,
                error: title.message
            });
        }

        // console.log("Generated Title");

        const description = await generateDescription(script);

        if (description?.error) {
            return res.status(500).json({
                success: false,
                stage: "description generation",
                provider: description.provider,
                error: description.message
            });
        }

        // console.log("Generated Description");

        const hashtags = await generateHashtags(topic);

        if (hashtags?.error) {
            return res.status(500).json({
                success: false,
                stage: "hashtag generation",
                provider: hashtags.provider,
                error: hashtags.message
            });
        }

        // console.log("Generated Hashtags");
        // console.log(hashtags)
        req.content = {
            success: true,
            topic,
            idea,
            script,
            title,
            description,
            hashtags
        };
        // const tag = hashtags.split(',');
        // await Video.create({
        //     // userID:req.user.id,
        //     title,
        //     description,
        //     hashtags:tag
        // })
        // console.log("Content Generate Done")
        next();

    } catch (error) {
        console.error("Script Controller Error:", error.message);
        next(error);
    }
}