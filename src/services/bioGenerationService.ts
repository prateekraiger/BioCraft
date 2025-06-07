import { FormData } from "../types/bio";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.chatanywhere.com.cn/v1/chat/completions";

export const generateBiosWithAI = async (
  formData: FormData,
  limit: number
): Promise<string[]> => {
  try {
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
            role: "system",
            content: `You are a professional bio writer. Generate ${formData.platform} bios that are engaging, authentic, and within ${limit} characters.`,
          },
          {
            role: "user",
            content: generatePrompt(formData),
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate bios");
    }

    const data = await response.json();
    return parseGeneratedBios(data.choices[0].message.content);
  } catch (error) {
    console.error("Error generating bios:", error);
    throw error;
  }
};

export const generateFallbackBios = (formData: FormData): string[] => {
  const bios: string[] = [];
  const { platform, purpose, keywords, achievements, interests } = formData;

  // Generate a professional bio
  bios.push(
    `${
      purpose === "business" ? "Business" : "Professional"
    } ${platform} bio:\n` +
      `${keywords}\n` +
      `${achievements ? `\n${achievements}` : ""}\n` +
      `${interests ? `\nInterests: ${interests}` : ""}`
  );

  // Generate a casual bio
  bios.push(
    `Casual ${platform} bio:\n` +
      `${keywords}\n` +
      `${interests ? `\nLoves: ${interests}` : ""}\n` +
      `${achievements ? `\n${achievements}` : ""}`
  );

  // Generate a creative bio
  bios.push(
    `Creative ${platform} bio:\n` +
      `${keywords}\n` +
      `${interests ? `\n✨ ${interests}` : ""}\n` +
      `${achievements ? `\n🎯 ${achievements}` : ""}`
  );

  return bios;
};

export const trimBiosToLimit = (bios: string[], limit: number): string[] => {
  return bios.map((bio) => {
    if (bio.length <= limit) return bio;
    return bio.slice(0, limit - 3) + "...";
  });
};

const generatePrompt = (formData: FormData): string => {
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

  return `Generate 3 different ${platform} bios with the following details:
- Purpose: ${purpose}
- Keywords: ${keywords}
- Tone: ${tone}
${achievements ? `- Achievements: ${achievements}` : ""}
${interests ? `- Interests: ${interests}` : ""}
${useEmojis ? "- Include relevant emojis" : ""}
${useHashtags ? "- Include relevant hashtags" : ""}
${useCta ? "- Include a call-to-action" : ""}

Make each bio unique and engaging while maintaining the specified tone.`;
};

const parseGeneratedBios = (content: string): string[] => {
  // Split the content by newlines and filter out empty lines
  const lines = content.split("\n").filter((line) => line.trim());

  // Group lines into bios (assuming each bio is separated by a blank line)
  const bios: string[] = [];
  let currentBio: string[] = [];

  lines.forEach((line) => {
    if (line.trim() === "") {
      if (currentBio.length > 0) {
        bios.push(currentBio.join("\n"));
        currentBio = [];
      }
    } else {
      currentBio.push(line);
    }
  });

  // Add the last bio if there is one
  if (currentBio.length > 0) {
    bios.push(currentBio.join("\n"));
  }

  return bios;
};
