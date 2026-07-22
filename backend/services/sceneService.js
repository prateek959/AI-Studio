import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateSceneQueries = async (scenes) => {

  try {

    const prompt = `
You are a professional video editor.

Convert each sentence into a short visual search query for stock videos (Pexels).

Rules:
- Return ONLY JSON array
- Each item must have:
  - scene (original sentence)
  - query (3 to 5 word search keywords)
- Query must describe what is visible visually
- No explanation
- No extra text
- Avoid generic words like motivation, success
- Make queries cinematic and realistic

Scenes:
${JSON.stringify(scenes)}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5
    });

    let result = response.choices[0]?.message?.content || "";

    // 🧹 clean response (important)
    result = result.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(result);

  } catch (error) {

    console.error("❌ Groq Scene Error:", error.message);

    return [];
  }
};