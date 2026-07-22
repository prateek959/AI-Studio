import Cerebras from "@cerebras/cerebras_cloud_sdk";
import "dotenv/config";
import { basePrompt } from "../utils/promptTemplate.js";

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY
});

export async function generateHashtags(topic) {

  try {

    const response = await client.chat.completions.create({
      model: "gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: basePrompt("hashtags",topic)
        }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.error(
      "❌ Cerebras Error:",
      error.response?.data || error.message
    );

    return {
      provider: "Cerebras",
      error: true,
      message: error.message
    };

  }

}