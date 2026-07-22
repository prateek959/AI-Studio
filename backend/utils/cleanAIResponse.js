export const cleanAIResponse = (text) => {
  try {

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log("JSON Parse Error:", error.message);
    return null;

  }
};