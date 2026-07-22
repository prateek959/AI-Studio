export const basePrompt = (type, input) => {

  if (type === "idea") {
    return `
Generate ONLY one content idea for YouTube Shorts in English.

Rules:
- 1 line idea
- No script, title, description, hashtags
- Return plain text only

Topic: ${input}
`;
  }

 if (type === "script") {
  return `
You are a professional YouTube Shorts scriptwriter. Create a HIGHLY ENGAGING script in Hinglish.

CORE PRINCIPLES:
1. **First Line Hook**: Start with a curiosity gap, shocking statement, or question that makes viewers STOP scrolling
2. **Suspense Structure**: Create anticipation - use phrases like "ruko...", "wait...", "secret kya hai...", "most log nahi jaante..."
3. **Conversational Tone**: Write like a friend revealing a secret, not a teacher giving instructions
4. **Power Words**: Use engaging words like - "secret", "actually", "real truth", "stop doing this", "only 1% know", "most people ignore this", "game changer"
5. **Storytelling**: Frame the information as a discovery or insight, not a boring list
6. **Pacing**: Short sentences. Line breaks for drama. Use "..." to create suspense
7. **Value Revelation**: Present the main insight in a surprising or unexpected way
8. **Emotional Connect**: Make viewer feel something - excitement, curiosity, urgency, or "aha" moment
9. **Strong CTA**: Create FOMO - make them feel they'll miss out if they don't like/comment/subscribe

FORMAT:
- Write in Hinglish (Hindi + easy English words)
- Keep under 100 words (15-20 seconds narration)
- Each sentence on new line for dramatic effect
- Create FOMO (Fear Of Missing Out)
- Return ONLY plain text script with line breaks
- No markdown, no JSON, no formatting

SCRIPT STRUCTURE TEMPLATE:
[Line 1-2] Hook: Start with question/shocking fact/suspense
[Line 3-4] Build: Create curiosity, set up the reveal
[Line 5-6] Reveal: Give the main insight/value in surprising way
[Line 7-8] Connect: Relate to viewer's desire or pain point
[Line 9-10] CTA: Urgent call to action with FOMO

CRITICAL:
- Do NOT use step-by-step instructions unless absolutely necessary
- Do NOT make it sound like a tutorial
- Make it feel like a viral secret being shared
- Adapt the tone and content to match the given idea naturally

Idea for script:
${input}
`;
}

  if (type === "title") {
    return `
Generate a viral YouTube Shorts title in English.

Rules:
- Max 10 words
- Catchy and engaging
- No script, description, hashtags
- Return plain text only

Script: ${input}
`;
  }

  if (type === "description") {
    return `
Generate a YouTube Shorts description in English.

Rules:
- 2-3 lines
- Engaging
- No title, script, hashtags
- Return plain text only

Script: ${input}
`;
  }

  if (type === "hashtags") {
    return `
Generate 10 trending hashtags in English.

Rules:
- Return only hashtags separated by space
- All hashtags should be relevant to the given topic
- No script, title, description

Topic: ${input}
`;
  }

};