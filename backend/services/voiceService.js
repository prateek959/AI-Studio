import gTTS from 'gtts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateVoice = (text) => {
    return new Promise((resolve, reject) => {
        try {
            // console.log("🎤 Generating voice for text:", text.substring(0, 50) + "...");
            
            // Create audio directory if not exists
            const audioDir = path.resolve(__dirname, "../storage/audio");
            if (!fs.existsSync(audioDir)) {
                fs.mkdirSync(audioDir, { recursive: true });
                // console.log("Created audio directory:", audioDir);
            }
            
            const audioPath = path.join(audioDir, "audio.mp3");
            
            // Detect language - Check if text contains Hindi characters
            const isHindi = /[\u0900-\u097F]/.test(text);
            const lang = isHindi ? 'hi' : 'en';
            
            // console.log(`Detected language: ${lang === 'hi' ? 'Hindi' : 'English'}`);
            
            // Create TTS instance
            const speech = new gTTS(text, lang);
            
            // Save to file
            speech.save(audioPath, (err, result) => {
                if (err) {
                    // console.error("❌ Error saving audio:", err);
                    reject(err);
                } else {
                    // console.log("✅ Audio generated successfully!");
                    
                    // Get file size
                    const stats = fs.statSync(audioPath);
                    // console.log(`Audio file size: ${(stats.size / 1024).toFixed(2)} KB`);
                    // console.log(` Audio saved at: ${audioPath}`);
                    
                    resolve(audioPath);
                }
            });
            
        } catch (error) {
            console.error("❌ Error generating voice:", error);
            reject(error);
        }
    });
};