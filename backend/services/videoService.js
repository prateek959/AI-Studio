import axios from "axios";
import "dotenv/config";

export const getVideo = async (query) => {

  try {

    const res = await axios.get(
      `https://api.pexels.com/videos/search?query=${query}&per_page=5`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY
        }
      }
    );

    const videos = res.data.videos;

    if (!videos.length) return null;

    const best = videos[0].video_files.find(v => v.quality === "hd");

    return best?.link || videos[0].video_files[0].link;

  } catch (error) {

    console.log("❌ Pexels Error:", error.message);
    return null;
  }
};