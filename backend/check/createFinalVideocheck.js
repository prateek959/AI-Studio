import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import ffprobe from "ffprobe-static";
import fs from "fs";
import path from "path";
import { normalizeClip } from "../utils/normalizeClip.js";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobe.path);

export const createFinalVideocheck = async (
  audioName,
  userID
) => {

  return new Promise(async (resolve, reject) => {

    try {

      const clipsFolder = path.resolve(
        `storage/clips/${userID}`
      );

      const outputFolder = path.resolve(
        `storage/output/${userID}`
      );

      const audioPath = path.resolve(
        `storage/audio/${userID}/${audioName}`
      );

      const normalizedFolder = path.resolve(
        `storage/normalized/${userID}`
      );

      if (!fs.existsSync(audioPath)) {
        return reject("Audio file not found");
      }

      if (!fs.existsSync(clipsFolder)) {
        return reject("Clips folder not found");
      }

      if (!fs.existsSync(outputFolder)) {

        fs.mkdirSync(outputFolder, {
          recursive: true
        });
      }

      if (!fs.existsSync(normalizedFolder)) {

        fs.mkdirSync(normalizedFolder, {
          recursive: true
        });
      }

      const files = fs.readdirSync(clipsFolder)

        .filter(file => file.endsWith(".mp4"))

        .sort((a, b) =>
          a.localeCompare(
            b,
            undefined,
            { numeric: true }
          )
        );

      if (files.length === 0) {
        return reject("No clips found");
      }

      console.log("================================");
      console.log("USER:", userID);
      console.log("AUDIO:", audioName);
      console.log("TOTAL CLIPS:", files.length);
      console.log("================================");

      // =========================
      // CLIP INFO
      // =========================

      files.forEach(file => {

        const clipPath = path.join(
          clipsFolder,
          file
        );

        ffmpeg.ffprobe(
          clipPath,
          (err, data) => {

            if (err) {

              console.log(
                `FFPROBE ERROR ${file}:`,
                err.message
              );

              return;
            }

            const stream =
              data.streams.find(
                s => s.codec_type === "video"
              );

            console.log({
              file,
              fps: stream?.r_frame_rate,
              width: stream?.width,
              height: stream?.height,
              duration:
                data?.format?.duration
            });

          }
        );

      });

      // =========================
      // NORMALIZE ALL CLIPS
      // =========================

      const normalizedFiles = [];

      for (let i = 0; i < files.length; i++) {

        const inputPath = path.join(
          clipsFolder,
          files[i]
        );

        const outputPath = path.join(
          normalizedFolder,
          `normalized_${i}.mp4`
        );

        console.log(
          `Normalizing: ${files[i]}`
        );

        await normalizeClip(
          inputPath,
          outputPath
        );

        normalizedFiles.push(outputPath);

        console.log(
          `Normalized Done: ${files[i]}`
        );
      }

      // =========================
      // FILELIST
      // =========================

      const fileListPath = path.join(
        outputFolder,
        "filelist.txt"
      );

      const fileContent = normalizedFiles

        .map(file => {

          return `file '${
            file.replace(/\\/g, "/")
          }`;

        })

        .join("\n");

      fs.writeFileSync(
        fileListPath,
        fileContent
      );

      // =========================
      // FINAL VIDEO
      // =========================

      const filename =
        `final${Date.now()}.mp4`;

      const finalVideoPath = path.join(
        outputFolder,
        filename
      );

      ffmpeg()

        .input(
          fileListPath.replace(
            /\\/g,
            "/"
          )
        )

        .inputOptions([
          "-f concat",
          "-safe 0"
        ])

        .input(audioPath)

        .outputOptions([
          "-c:v libx264",
          "-preset ultrafast",
          "-crf 23",
          "-c:a aac",
          "-b:a 192k",
          "-map 0:v",
          "-map 1:a",
          "-shortest"
        ])

        .on("start", cmd => {

          console.log(
            "FFMPEG STARTED"
          );

          console.log(cmd);

        })

        .on("progress", progress => {

          console.log(progress);

        })

        .on("stderr", line => {

          if (
            line.includes("duplicated") ||
            line.includes("drop")
          ) {

            console.log(
              "IMPORTANT:",
              line
            );

          }

        })

        .on("end", () => {

          console.log(
            "FINAL VIDEO GENERATED"
          );

          try {

            if (
              fs.existsSync(fileListPath)
            ) {

              fs.unlinkSync(
                fileListPath
              );

              console.log(
                "filelist deleted"
              );
            }

          } catch (err) {

            console.log(err.message);
          }

          // DELETE ORIGINAL CLIPS

          files.forEach(file => {

            try {

              const clipPath = path.join(
                clipsFolder,
                file
              );

              if (
                fs.existsSync(clipPath)
              ) {

                fs.unlinkSync(
                  clipPath
                );

                console.log(
                  `Deleted Clip: ${file}`
                );
              }

            } catch (err) {

              console.log(err.message);
            }

          });

          // DELETE NORMALIZED CLIPS

          normalizedFiles.forEach(file => {

            try {

              if (
                fs.existsSync(file)
              ) {

                fs.unlinkSync(file);

                console.log(
                  `Deleted Normalized: ${path.basename(file)}`
                );
              }

            } catch (err) {

              console.log(err.message);
            }

          });

          // DELETE AUDIO

          try {

            if (
              fs.existsSync(audioPath)
            ) {

              fs.unlinkSync(audioPath);

              console.log(
                "Audio Deleted"
              );
            }

          } catch (err) {

            console.log(err.message);
          }

          // DELETE NORMALIZED FOLDER

          try {

            if (
              fs.existsSync(normalizedFolder) &&
              fs.readdirSync(normalizedFolder).length === 0
            ) {

              fs.rmdirSync(
                normalizedFolder
              );

              console.log(
                "Normalized Folder Deleted"
              );
            }

          } catch (err) {

            console.log(err.message);
          }

          resolve(filename);

        })

        .on("error", err => {

          console.log(
            "FFMPEG ERROR:",
            err.message
          );

          reject(err);

        })

        .save(finalVideoPath);

    } catch (error) {

      reject(error);

    }

  });

};