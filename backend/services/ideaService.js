import { OpenRouter } from "@openrouter/sdk";
import "dotenv/config";
import { basePrompt } from "../utils/promptTemplate.js";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export async function generateIdea(topic) {

  try {
// console.log("12", topic)
    const completion = await openrouter.chat.send({
      chatGenerationParams: {
        // model: "openai/gpt-oss-120b:free",
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: basePrompt("idea",topic)
          }
        ]
      }
    });

    return completion.choices[0].message.content;

  } catch (error) {

    console.error("❌ OpenRouter Error:", error.message);

    return {
      provider: "OpenRouter",
      error: true,
      message: error.message
    };

  }

}