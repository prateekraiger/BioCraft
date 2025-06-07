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
            content: `You are a professional bio writer. Generate 3 different ${formData.platform} bios that are engaging, authentic, and MUST be within ${limit} characters each. Each bio should be separated by "---".`,
          },
          {
            role: "user",
            content: generatePrompt(formData, limit),
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate bios");
    }

    const data = await response.json();
    const bios = parseGeneratedBios(data.choices[0].message.content);
    return trimBiosToLimit(bios, limit);
  } catch (error) {
    console.error("Error generating bios:", error);
    return generateFallbackBios(formData, limit);
  }
};

export const generateFallbackBios = (
  formData: FormData,
  limit: number
): string[] => {
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

  return trimBiosToLimit(bios, limit);
};

export const trimBiosToLimit = (bios: string[], limit: number): string[] => {
  return bios.map((bio) => {
    if (bio.length <= limit) return bio;
    // Try to find a good breaking point (space or newline) near the limit
    const breakPoint = bio.lastIndexOf(" ", limit - 3);
    if (breakPoint > 0) {
      return bio.slice(0, breakPoint) + "...";
    }
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

  return `Generate 3 different ${platform} bios with the following details:
- Purpose: ${purpose}
- Keywords: ${keywords}
- Tone: ${tone}
${achievements ? `- Achievements: ${achievements}` : ""}
${interests ? `- Interests: ${interests}` : ""}
${useEmojis ? "- Include relevant emojis" : ""}
${useHashtags ? "- Include relevant hashtags" : ""}
${useCta ? "- Include a call-to-action" : ""}

Important requirements:
1. Each bio MUST be within ${limit} characters
2. Separate each bio with "---"
3. Make each bio unique and engaging while maintaining the specified tone
4. Do not include any labels or prefixes in the bios`;
};

const parseGeneratedBios = (content: string): string[] => {
  // Split by the separator and filter out empty entries
  return content
    .split("---")
    .map((bio) => bio.trim())
    .filter((bio) => bio.length > 0);
};
