import Groq from "groq-sdk";
import "dotenv/config";
import { basePrompt } from "../utils/promptTemplate.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const Prompt = (idea) => `
Generate a YouTube Shorts script.

Rules:
- Write in Hindi (Devanagari script)
- Mix common English words like mindset, success, goal, focus naturally
- Keep sentences short and conversational
- Make it sound like natural Hinglish speaking
- Optimize for voice narration (use commas, dots, pauses)
- Max 80–100 words
- Do NOT return JSON
- Do NOT add markdown or formatting
- Return ONLY plain text script

Topic:
${idea}
`;

export async function generateScript(idea) {

  try {

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: basePrompt("script",idea)
        }
      ],
      model: "openai/gpt-oss-20b"
    });

     let content = await response.choices[0]?.message?.content || "";

    content = content
      .replace(/```/g, "")
      .replace(/json/gi, "")
      .trim();
    return content;

  } catch (error) {

    console.error("❌ Groq Error:", error.message);

    return {
      provider: "Groq",
      error: true,
      message: error.message
    };

  }

}