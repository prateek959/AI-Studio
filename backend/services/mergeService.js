import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath);

export const createFinalVideo = async (audioName, userID) => {

  return new Promise((resolve, reject) => {

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


      // =====================================================
      // CHECK AUDIO EXISTS
      // =====================================================

      if (!fs.existsSync(audioPath)) {
        return reject("Audio file not found");
      }


      // =====================================================
      // CREATE OUTPUT FOLDER
      // =====================================================

      if (!fs.existsSync(outputFolder)) {

        fs.mkdirSync(outputFolder, {
          recursive: true
        });
      }


      // =====================================================
      // GET ALL CLIPS
      // =====================================================

      const files = fs.readdirSync(clipsFolder)

        .filter(file => file.endsWith(".mp4"))

        .sort((a, b) => {
          return a.localeCompare(
            b,
            undefined,
            { numeric: true }
          );
        });


      // =====================================================
      // NO CLIPS FOUND
      // =====================================================

      if (files.length === 0) {
        return reject("No clips found");
      }


      // =====================================================
      // CREATE FILELIST
      // =====================================================

      const fileListPath = path.join(
        outputFolder,
        "filelist.txt"
      );

      const fileContent = files

        .map(file => {

          const fullPath = path
            .join(clipsFolder, file)
            .replace(/\\/g, "/");

          return `file '${fullPath}'`;
        })

        .join("\n");


      fs.writeFileSync(
        fileListPath,
        fileContent
      );


      // =====================================================
      // FINAL VIDEO PATH
      // =====================================================

      const filename =
        `final${Date.now()}.mp4`;

      const finalVideoPath = path.join(
        outputFolder,
        filename
      );


      // =====================================================
      // FFMPEG
      // =====================================================

      ffmpeg()

        .input(
          fileListPath.replace(/\\/g, "/")
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

          "-shortest",

          "-strict experimental"
        ])

        .save(finalVideoPath)


        // =====================================================
        // SUCCESS
        // =====================================================

        .on("end", () => {

          console.log(
            "Final Video Generated"
          );


          // DELETE FILELIST

          if (fs.existsSync(fileListPath)) {

            fs.unlinkSync(fileListPath);

            console.log(
              "filelist.txt deleted"
            );
          }


          // DELETE CLIPS

          files.forEach(file => {

            const clipPath = path.join(
              clipsFolder,
              file
            );

            if (fs.existsSync(clipPath)) {

              fs.unlinkSync(clipPath);

              console.log(
                `Deleted clip: ${file}`
              );
            }
          });


          // DELETE AUDIO

          if (fs.existsSync(audioPath)) {

            fs.unlinkSync(audioPath);

            console.log(
              "Audio deleted"
            );
          }


          resolve(filename);
        })


        // =====================================================
        // ERROR
        // =====================================================

        .on("error", (err) => {

          console.log(
            "FFmpeg Error:",
            err.message
          );


          // DELETE FILELIST

          if (fs.existsSync(fileListPath)) {

            fs.unlinkSync(fileListPath);
          }


          reject(err.message);
        });

    } catch (error) {

      reject(error.message);
    }

  });
};