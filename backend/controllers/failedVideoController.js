import { createFinalVideocheck } from "../check/createFinalVideocheck.js";
import Failed from "../models/failedSchema.js";
import Video from "../models/videoSchema.js";

import { createFinalVideo } from "../services/mergeService.js";
import { generateSceneQueries } from "../services/sceneService.js";
import { getVideo } from "../services/videoService.js";

import { cleanScript, downloadVideo, splitScript } from "./generateScriptToScenesController.js";

const failedVideoController = async () => {

    let failedVideo;

    try {

        // GET PENDING FAILED VIDEO

        failedVideo = await Failed.findOneAndUpdate(
            {
                processing: false,
                videoGenerated: false
            },
            {
                processing: true
            },
            {
                 returnDocument:"after"
            }
        ).sort({
            createdAt: 1
        });


        // NO FAILED VIDEO

        if (!failedVideo) {

            console.log("No Failed Videos Pending");

            return;
        }


        console.log("Processing Failed Video");


        // =====================================================
        // SCENE GENERATION
        // =====================================================

        if (!failedVideo.sceneGenerated) {

            console.log("🎬 Generating Scenes...");

            const clean = cleanScript(
                failedVideo.script
            );

            const scenes = splitScript(clean);

            const structuredScenes =
                await generateSceneQueries(
                    scenes.slice(0, 5)
                );

            failedVideo.scenes = structuredScenes;

            failedVideo.sceneGenerated = true;

            await failedVideo.save();

            console.log("Scenes Generated");
        }


        // =====================================================
        // CLIP GENERATION
        // =====================================================

        if (!failedVideo.clipGenerated) {

            console.log("Generating Clips...");

            let count = 1;

            const clipsFolder = `storage/clips/${failedVideo.userID}`;

            try {

                for (let item of failedVideo.scenes) {

                    const videoUrl =
                        await getVideo(item.query);

                    if (videoUrl) {

                        await downloadVideo(
                            videoUrl,
                            `clip${failedVideo.userID}${count}`,
                            failedVideo.userID
                        );

                        console.log(
                            `Clip ${count} Downloaded`
                        );

                        count++;
                    }
                }

                failedVideo.clipGenerated = true;

                await failedVideo.save();

                console.log("All Clips Generated");

            } catch (err) {

                console.log(
                    "Clip Error:",
                    err.message
                );

                // DELETE CLIPS FOLDER

                if (fs.existsSync(clipsFolder)) {

                    fs.rmSync(clipsFolder, {
                        recursive: true,
                        force: true
                    });

                    console.log(
                        "Partial Clips Deleted"
                    );
                }

                throw err;
            }
        }


        // =====================================================
        // FINAL VIDEO GENERATION
        // =====================================================

        if (!failedVideo.videoGenerated) {

            console.log("Creating Final Video...");

            const fileName =
                // await createFinalVideo(failedVideo.audio, failedVideo.userID);
               await createFinalVideocheck(failedVideo.audio, failedVideo.userID)
            const url = `${failedVideo.baseURL}/storage/output/${failedVideo.userID}/${fileName}`;

            await Video.create({

                userID: failedVideo.userID,
                title: failedVideo.title,
                description: failedVideo.description,
                hashtags: failedVideo.hashtags,
                VideoURL: url
            });

            failedVideo.videoGenerated = true;

            await failedVideo.save();

            console.log("Final Video Generated");
        }


        // =====================================================
        // DELETE SUCCESS JOB
        // =====================================================

        await Failed.findByIdAndDelete(
            failedVideo._id
        );

        console.log("Failed Job Deleted");


    } catch (error) {

        console.log(
            "Failed Video Controller Error:",
            error
        );


        // RESET PROCESSING

        if (failedVideo) {

            failedVideo.processing = false;

            failedVideo.retryCount += 1;

            await failedVideo.save();
        }
    }
}; 

export default failedVideoController;