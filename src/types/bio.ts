export interface FormData {
  platform: string;
  purpose: string;
  keywords: string;
  tone: string;
  achievements: string;
  interests: string;
  useEmojis: boolean;
  useHashtags: boolean;
  useCta: boolean;
}

export interface PlatformLimits {
  [key: string]: number;
}
