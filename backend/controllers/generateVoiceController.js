import gTTS from 'gtts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const voiceGenerater = async (req, res, next) => {
    try {
        const text = req.content.script
        // console.log(text)
        // console.log("🎤 Generating voice for text:", text.substring(0, 50) + "...");

        // Create audio directory if not exists
        const audioDir = path.resolve(__dirname, `../storage/audio/${req.user.id}`);
        if (!fs.existsSync(audioDir)) {
            fs.mkdirSync(audioDir, { recursive: true });
            // console.log("Created audio directory:", audioDir);
        }
        const audioName = `audio${Date.now()}.mp3`
        const audioPath = path.join(audioDir, audioName);

        // Detect language - Check if text contains Hindi characters
        const isHindi = /[\u0900-\u097F]/.test(text);
        const lang = isHindi ? 'hi' : 'en';

        // console.log(`Detected language: ${lang === 'hi' ? 'Hindi' : 'English'}`);

        // Create TTS instance
        const speech = new gTTS(text, lang);

        await new Promise((resolve, reject) => {

            speech.save(audioPath, (err) => {

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        req.content.audio = audioName;

        next();
    } catch (error) {
        console.error("Voice Controller Error:", error.message);
        next(error)
    }


}