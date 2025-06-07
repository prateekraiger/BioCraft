import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  generateBiosWithAI,
  generateFallbackBios,
  trimBiosToLimit,
} from "../services/bioGenerationService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RefreshCw, Sparkles } from "lucide-react";
import BioOption from "./BioOption";
import { FormData, PlatformLimits } from "../types/bio";

const BioGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    platform: "",
    purpose: "",
    keywords: "",
    tone: "",
    achievements: "",
    interests: "",
    useEmojis: false,
    useHashtags: false,
    useCta: false,
  });

  const [bioOptions, setBioOptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("form");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (
    name: keyof FormData,
    value: string | boolean
  ) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateBios = async () => {
    setIsGenerating(true);

    // Validate form data
    if (!formData.platform || !formData.keywords || !formData.purpose) {
      alert("Please fill in the platform, keywords, and purpose fields.");
      setIsGenerating(false);
      return;
    }

    try {
      const platformLimits: PlatformLimits = {
        Instagram: 150,
        Twitter: 160,
        LinkedIn: 220,
        WhatsApp: 80,
        Facebook: 101,
      };

      const limit =
        platformLimits[formData.platform as keyof PlatformLimits] || 150;

      // Try to generate bios with AI
      let generatedBios: string[] = [];
      try {
        // Call OpenRouter API to generate bios
        generatedBios = await generateBiosWithAI(formData, limit);
      } catch (apiError) {
        console.error(
          "API generation failed, falling back to local generation:",
          apiError
        );
        // Fallback to local generation if API fails
        generatedBios = generateFallbackBios(formData, limit);
      }

      // Ensure all bios respect the platform's character limit
      const trimmedBios = trimBiosToLimit(generatedBios, limit);

      setBioOptions(trimmedBios);
      setIsGenerating(false);
      setActiveTab("results");
    } catch (error) {
      console.error("Error generating bios:", error);
      alert(
        `Failed to generate bios: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`
      );
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateBios();
  };

  const resetForm = () => {
    setFormData({
      platform: "",
      purpose: "",
      keywords: "",
      tone: "",
      achievements: "",
      interests: "",
      useEmojis: false,
      useHashtags: false,
      useCta: false,
    });
    setBioOptions([]);
    setActiveTab("form");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg border-t-4 border-t-black/10 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-white/50 p-6 sm:p-8 border-b border-black/5">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-black">
            Create Your Bio
          </CardTitle>
          <CardDescription className="text-center text-base sm:text-lg mt-4 text-black/70 max-w-2xl mx-auto">
            Fill in the details below to generate your perfect social media bio
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-black/5">
            <TabsTrigger
              value="form"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 text-sm sm:text-base"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pen-tool"
                >
                  <path d="m12 19 7-7 3 3-7 7-3-3z" />
                  <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="m2 2 7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                Create Bio
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="results"
              disabled={bioOptions.length === 0}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 text-sm sm:text-base"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list-checks"
                >
                  <path d="m3 17 2 2 4-4" />
                  <path d="m3 7 2 2 4-4" />
                  <path d="M13 6h8" />
                  <path d="M13 12h8" />
                  <path d="M13 18h8" />
                </svg>
                Results ({bioOptions.length})
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="p-0">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 sm:space-y-8 pt-6 sm:pt-8 px-4 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <Label
                      htmlFor="platform"
                      className="text-base sm:text-lg font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                        1
                      </span>
                      Choose your platform{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-black/60">
                      Select the social media platform for your bio
                    </p>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("platform", value)
                      }
                      value={formData.platform}
                      required
                    >
                      <SelectTrigger className="w-full mt-1 transition-all duration-200 hover:border-black/30">
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="purpose"
                      className="text-base sm:text-lg font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                        2
                      </span>
                      Your purpose <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-black/60">
                      What do you want to achieve with your bio?
                    </p>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("purpose", value)
                      }
                      value={formData.purpose}
                      required
                    >
                      <SelectTrigger className="w-full mt-1 transition-all duration-200 hover:border-black/30">
                        <SelectValue placeholder="Select your purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Brand</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="keywords"
                    className="text-base sm:text-lg font-medium flex items-center gap-2"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                      3
                    </span>
                    Keywords <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-black/60">
                    Enter keywords that describe you or your brand
                    (comma-separated)
                  </p>
                  <Input
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="e.g., digital marketer, photographer, tech enthusiast"
                    className="w-full mt-1 transition-all duration-200 hover:border-black/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tone"
                      className="text-base sm:text-lg font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                        4
                      </span>
                      Tone
                    </Label>
                    <p className="text-sm text-black/60">
                      Choose the tone for your bio
                    </p>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("tone", value)
                      }
                      value={formData.tone}
                    >
                      <SelectTrigger className="w-full mt-1 transition-all duration-200 hover:border-black/30">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="achievements"
                      className="text-base sm:text-lg font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                        5
                      </span>
                      Achievements
                    </Label>
                    <p className="text-sm text-black/60">
                      List your key achievements or credentials
                    </p>
                    <Input
                      id="achievements"
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleChange}
                      placeholder="e.g., 5+ years experience, certified expert"
                      className="w-full mt-1 transition-all duration-200 hover:border-black/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="interests"
                    className="text-base sm:text-lg font-medium flex items-center gap-2"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                      6
                    </span>
                    Interests
                  </Label>
                  <p className="text-sm text-black/60">
                    Share your interests or hobbies
                  </p>
                  <Textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="e.g., photography, hiking, reading"
                    className="w-full mt-1 transition-all duration-200 hover:border-black/30"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base sm:text-lg font-medium flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/10 text-black text-sm">
                      7
                    </span>
                    Additional Options
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="useEmojis"
                        name="useEmojis"
                        checked={formData.useEmojis}
                        onCheckedChange={(checked) =>
                          handleSelectChange("useEmojis", checked)
                        }
                      />
                      <Label htmlFor="useEmojis" className="text-sm">
                        Use Emojis
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="useHashtags"
                        name="useHashtags"
                        checked={formData.useHashtags}
                        onCheckedChange={(checked) =>
                          handleSelectChange("useHashtags", checked)
                        }
                      />
                      <Label htmlFor="useHashtags" className="text-sm">
                        Use Hashtags
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="useCta"
                        name="useCta"
                        checked={formData.useCta}
                        onCheckedChange={(checked) =>
                          handleSelectChange("useCta", checked)
                        }
                      />
                      <Label htmlFor="useCta" className="text-sm">
                        Add Call-to-Action
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 px-4 sm:px-8 pb-6 sm:pb-8 border-t border-black/10 mt-12">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto mt-8">
                  <Button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full sm:w-auto px-8 py-3 bg-black text-white hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl group relative overflow-hidden"
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                          Generate Bio
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-8 py-3 border-black/20 hover:bg-black/5 hover:border-black/30 text-black/70 hover:text-black transition-all duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:rotate-180"
                      >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M8 16H3v5" />
                      </svg>
                      Reset Form
                    </span>
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="results" className="p-0">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                {bioOptions.map((bio, index) => (
                  <BioOption
                    key={index}
                    bio={bio}
                    index={index}
                    platform={formData.platform}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 px-6 sm:px-8 pb-6 sm:pb-8 border-t border-black/10">
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("form")}
                  className="w-full sm:w-auto"
                >
                  Back to Editor
                </Button>
                <Button
                  type="button"
                  onClick={generateBios}
                  className="w-full sm:w-auto bg-black text-white hover:bg-black/90"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </span>
                </Button>
              </div>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default BioGenerator;
