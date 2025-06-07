import { FormData } from "../types/bio";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.chatanywhere.com.cn/v1/chat/completions";

export const generateBiosWithAI = async (
  formData: FormData,
  limit: number
): Promise<string[]> => {
  try {
    const prompt = generatePrompt(formData, limit);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    return parseGeneratedBios(generatedText);
  } catch (error) {
    console.error("Error generating bios with AI:", error);
    throw error;
  }
};

export const generateFallbackBios = (formData: FormData): string[] => {
  const {
    platform,
    purpose,
    keywords,
    tone,
    achievements,
    interests,
    useEmojis,
    useHashtags,
    useCta,
  } = formData;

  const bios = [
    `${keywords} | ${purpose} | ${
      achievements ? `Achievements: ${achievements} | ` : ""
    }${interests ? `Interests: ${interests}` : ""}`,
    `${purpose} specialist | ${keywords} | ${
      achievements ? `Awarded: ${achievements} | ` : ""
    }${interests ? `Passionate about ${interests}` : ""}`,
    `${keywords} enthusiast | ${purpose} professional | ${
      achievements ? `Notable: ${achievements} | ` : ""
    }${interests ? `Loves ${interests}` : ""}`,
  ];

  return bios.map((bio) => {
    let enhancedBio = bio;
    if (useEmojis) {
      enhancedBio = enhancedBio.replace(/\|/g, " ✨ ");
    }
    if (useHashtags) {
      enhancedBio = enhancedBio.replace(/\b(\w+)\b/g, (match) => {
        if (match.length > 3) return `#${match}`;
        return match;
      });
    }
    if (useCta) {
      enhancedBio += " | Let's connect!";
    }
    return enhancedBio;
  });
};

export const trimBiosToLimit = (bios: string[], limit: number): string[] => {
  return bios.map((bio) => {
    if (bio.length <= limit) return bio;
    return bio.slice(0, limit - 3) + "...";
  });
};

const generatePrompt = (formData: FormData, limit: number): string => {
  const {
    platform,
    purpose,
    keywords,
    tone,
    achievements,
    interests,
    useEmojis,
    useHashtags,
    useCta,
  } = formData;

  return `Generate 3 unique and engaging social media bios for ${platform} with the following details:
- Purpose: ${purpose}
- Keywords: ${keywords}
- Tone: ${tone || "professional"}
${achievements ? `- Achievements: ${achievements}` : ""}
${interests ? `- Interests: ${interests}` : ""}
${useEmojis ? "- Include relevant emojis" : ""}
${useHashtags ? "- Include relevant hashtags" : ""}
${useCta ? "- Include a call-to-action" : ""}

Requirements:
- Each bio must be under ${limit} characters
- Make it unique and engaging
- Match the specified tone
- Be platform-appropriate for ${platform}
- Include the provided keywords naturally
${achievements ? "- Highlight the achievements" : ""}
${interests ? "- Incorporate the interests" : ""}

Format the response as a numbered list of bios, one per line.`;
};

const parseGeneratedBios = (text: string): string[] => {
  // Split by newlines and remove empty lines
  const lines = text.split("\n").filter((line) => line.trim());

  // Extract bios from numbered lines (e.g., "1. Bio text" or "1) Bio text")
  return lines
    .map((line) => line.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter((bio) => bio.length > 0);
};
