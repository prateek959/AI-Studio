import { Mistral } from "@mistralai/mistralai";
import "dotenv/config";
import { basePrompt } from "../utils/promptTemplate.js";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY
});

export async function generateTitle(script) {

  try {

    const response = await client.chat.complete({
      model: "mistral-medium-latest",
      messages: [
        {
          role: "user",
          content: basePrompt("title",script)
        }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.error("❌ Mistral Error:", error.message);

    return {
      provider: "Mistral",
      error: true,
      message: error.message
    };

  }

}