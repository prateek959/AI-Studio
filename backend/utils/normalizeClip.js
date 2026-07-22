import ffmpeg from "fluent-ffmpeg";

export const normalizeClip = (
  inputPath,
  outputPath
) => {

  return new Promise((resolve, reject) => {

    ffmpeg(inputPath)

      .videoFilters([
        "scale=1280:720:force_original_aspect_ratio=decrease",
        "pad=1280:720:(ow-iw)/2:(oh-ih)/2",
        "fps=25"
      ])

      .outputOptions([
        "-c:v libx264",
        "-preset ultrafast",
        "-pix_fmt yuv420p",
        "-an"
      ])

      .on("end", () => {

        console.log(
          `Normalized: ${outputPath}`
        );

        resolve();
      })

      .on("error", reject)

      .save(outputPath);

  });

};