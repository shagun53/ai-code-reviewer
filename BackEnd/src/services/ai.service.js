const OpenAI = require("openai");

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_INSTRUCTION = `You are an expert senior software engineer acting as a code reviewer.

Analyze the given code and respond with ONLY a valid JSON object — no markdown, no explanation outside the JSON, no code fences. The JSON must follow this exact structure:

{
  "summary": "One-line verdict on the overall code quality",
  "language": "Detected programming language",
  "overallQuality": "excellent" or "good" or "needs-work" or "poor",
  "issues": [
    {
      "severity": "critical" or "warning" or "suggestion",
      "category": "bug" or "readability" or "performance" or "security" or "best-practice",
      "lineReference": "specific line or function name",
      "description": "Clear explanation of the issue",
      "fix": "Suggested correction or null"
    }
  ],
  "strengths": ["things the code does well"],
  "improvedCode": "Full corrected version as a string or null"
}

Rules:
- Output must be valid parseable JSON only — nothing else.
- If no issues, return empty issues array and set improvedCode to null.
- Always detect and set the language field correctly.`;

async function generateContent(code) {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: `Review this code:\n\n${code}` }
        ],
        response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;
    return JSON.parse(raw);
}

module.exports = generateContent;