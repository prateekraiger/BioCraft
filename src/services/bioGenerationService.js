// Get API key from environment variable
const API_KEY = "sk-p4qx8pzMm4WaTeBjYNn4WxhXizqlmQJctQAdTtSIQctXsfdg";

if (!API_KEY) {
  console.error("API key is not set");
}

/**
 * Generate bio options using ChatAnywhere API
 * @param {Object} formData - User input for bio generation
 * @param {number} limit - Character limit for the platform
 * @returns {Promise<string[]>} - Array of generated bio options
 */
export const generateBiosWithAI = async (formData, limit) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not configured");
    }

    // Create prompt for the API
    const prompt = `Generate 3 creative, engaging bio options for ${
      formData.platform
    } with these details:
    - Main keywords: ${formData.keywords}
    - Primary purpose: ${formData.purpose}
    - Tone: ${formData.tone || "Casual"}
    - Achievements: ${formData.achievements || "None"}
    - Interests: ${formData.interests || "None"}
    - Include emojis: ${formData.useEmojis ? "Yes" : "No"}
    - Include hashtags: ${formData.useHashtags ? "Yes" : "No"}
    - Include call-to-action: ${formData.useCta ? "Yes" : "No"}

    Keep each bio under ${limit} characters (${formData.platform} limit).
    Make each bio unique and tailored to the platform.
    Return ONLY the bio text in these exact format (3 options separated by |||):
    bio1|||bio2|||bio3
    `;

    // Call ChatAnywhere API
    const response = await fetch(
      "https://api.chatanywhere.com.cn/v1/chat/completions",
      {
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
              content:
                "You are a creative social media expert who specializes in writing engaging, platform-specific social media bios.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate bios");
    }

    // Extract and process the generated bios
    const content = data.choices[0]?.message?.content?.trim() || "";
    let generatedBios = content.split("|||").map((bio) => bio.trim());

    // If the API didn't return bios in the expected format, attempt to parse differently
    if (generatedBios.length < 2) {
      // Try to extract numbered bios
      generatedBios = content
        .split(/\d+\.\s/)
        .filter((bio) => bio.trim().length > 0);
    }

    return generatedBios;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Generate fallback bios without API
 * @param {Object} formData - User input for bio generation
 * @returns {string[]} - Array of generated bio options
 */
export const generateFallbackBios = (formData) => {
  const keywords = formData.keywords.split(",").map((k) => k.trim());
  const toneMap = {
    Professional: {
      start: ["Dedicated", "Experienced", "Specialized in"],
      connectors: ["Focused on", "Working with", "Passionate about"],
      emojis: ["📊", "💼", "📈", "🔍", "✅"],
    },
    Casual: {
      start: ["Love", "Enjoy", "All about"],
      connectors: ["Also into", "Fan of", "Exploring"],
      emojis: ["✌️", "👋", "😊", "💯", "🙌"],
    },
    Humorous: {
      start: ["Professional", "Master of", "Surviving on"],
      connectors: ["Occasionally", "When not", "Probably"],
      emojis: ["😂", "🤣", "😜", "🤪", "🎭"],
    },
    Inspirational: {
      start: ["Believing in", "On a mission to", "Dedicated to"],
      connectors: ["Inspiring", "Creating", "Building"],
      emojis: ["✨", "🚀", "💫", "🌟", "💪"],
    },
    Mysterious: {
      start: ["Exploring", "Wandering through", "Discovering"],
      connectors: ["Sometimes", "Perhaps", "Between"],
      emojis: ["🌙", "🔮", "✴️", "🌌", "🎭"],
    },
  };

  const tone = toneMap[formData.tone] || toneMap.Casual;
  const randomEmoji = () =>
    tone.emojis[Math.floor(Math.random() * tone.emojis.length)];

  // Generate bios based on input and selected platform
  const generatedBios = [
    // Bio 1: Keyword-focused
    `${formData.useEmojis ? `${randomEmoji()} ` : ""}${keywords.join(" | ")}${
      formData.useEmojis ? ` ${randomEmoji()}` : ""
    }
${formData.purpose} ${
      formData.tone === "Professional" ? "professional" : "enthusiast"
    } ${tone.connectors[0]} ${formData.interests}${
      formData.useHashtags ? `\n#${keywords.join(" #")}` : ""
    }${formData.useCta ? "\nLet's connect! 👇" : ""}`,

    // Bio 2: Purpose-focused
    `${formData.useEmojis ? `${randomEmoji()} ` : ""}${
      tone.start[0]
    } ${formData.purpose.toLowerCase()} ${keywords[0].toLowerCase()}${
      formData.useEmojis ? ` ${randomEmoji()}` : ""
    }
${formData.interests}${
      formData.achievements ? `\n${formData.achievements}` : ""
    }${
      formData.useHashtags
        ? `\n#${formData.platform.toLowerCase()} #${keywords
            .slice(0, 2)
            .join(" #")}`
        : ""
    }${formData.useCta ? "\nDM for collabs 📩" : ""}`,

    // Bio 3: Interest-focused
    `${formData.useEmojis ? `${randomEmoji()} ` : ""}${keywords
      .slice(0, 2)
      .join(" & ")}${formData.useEmojis ? ` ${randomEmoji()}` : ""}
${tone.start[1]} ${formData.interests}${
      formData.useCta
        ? `\nFollow for more ${keywords[0].toLowerCase()} content!`
        : ""
    }${
      formData.useHashtags
        ? `\n#${keywords[0].toLowerCase()} #${formData.purpose
            .toLowerCase()
            .replace(/\s+/g, "")}`
        : ""
    }`,
  ];

  // For LinkedIn, add more professional details
  if (formData.platform === "LinkedIn") {
    const professionalBio = `${formData.useEmojis ? "🔹 " : ""}${
      formData.tone === "Professional" ? "Professional " : ""
    }${keywords.slice(0, 2).join(" & ")}
${formData.achievements}
${formData.interests}
${formData.useHashtags ? `#${keywords.join(" #")}` : ""}${
      formData.useCta ? "\nOpen to new opportunities and connections." : ""
    }`;

    generatedBios.push(professionalBio);
  }

  // For TikTok, add a shorter, punchier option
  if (formData.platform === "TikTok") {
    const tiktokBio = `${formData.useEmojis ? `${randomEmoji()} ` : ""}${
      keywords[0]
    } ${formData.useEmojis ? `${randomEmoji()} ` : ""}
${formData.interests.split(".")[0]}${
      formData.useCta ? "\nNew content daily!" : ""
    }${formData.useHashtags ? ` #${formData.platform.toLowerCase()}` : ""}`;

    generatedBios.push(tiktokBio);
  }

  return generatedBios;
};

/**
 * Ensure bios respect character limits
 * @param {string[]} bios - Array of generated bios
 * @param {number} limit - Character limit
 * @returns {string[]} - Array of trimmed bios
 */
export const trimBiosToLimit = (bios, limit) => {
  return bios.map((bio) => {
    if (bio.length > limit) {
      return bio.substring(0, limit - 3) + "...";
    }
    return bio;
  });
};
