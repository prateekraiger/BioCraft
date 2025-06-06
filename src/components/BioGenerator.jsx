import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { RefreshCw } from "lucide-react";
import BioOption from "./BioOption";

const BioGenerator = () => {
  const [formData, setFormData] = useState({
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

  const [bioOptions, setBioOptions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name, value) => {
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
      const platformLimits = {
        Instagram: 150,
        Twitter: 160,
        LinkedIn: 220,
        WhatsApp: 80,
        Facebook: 101,
      };

      const limit = platformLimits[formData.platform] || 150;

      // Try to generate bios with AI
      let generatedBios = [];
      try {
        // Call OpenRouter API to generate bios
        generatedBios = await generateBiosWithAI(formData, limit);
      } catch (apiError) {
        console.error(
          "API generation failed, falling back to local generation:",
          apiError
        );
        // Fallback to local generation if API fails
        generatedBios = generateFallbackBios(formData);
      }

      // Ensure all bios respect the platform's character limit
      const trimmedBios = trimBiosToLimit(generatedBios, limit);

      setBioOptions(trimmedBios);
      setIsGenerating(false);
      setActiveTab("results");
    } catch (error) {
      console.error("Error generating bios:", error);
      alert(`Failed to generate bios: ${error.message}. Please try again.`);
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
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
    <div className="container mx-auto max-w-3xl py-4 sm:py-8 px-3 sm:px-4">
      <Card className="shadow-lg border-t-4 border-t-primary transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-muted/50 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Social Media Bio Generator
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base mt-2">
            Create the perfect bio for your social media profiles in just a few
            steps
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/30">
            <TabsTrigger
              value="form"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 text-sm sm:text-base"
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
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 text-sm sm:text-base"
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
              <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="platform"
                      className="text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        1
                      </span>
                      Choose your platform{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Select the social media platform for your bio
                    </p>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("platform", value)
                      }
                      value={formData.platform}
                      required
                    >
                      <SelectTrigger className="w-full mt-1 transition-all duration-200 hover:border-primary/50">
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
                      className="text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        2
                      </span>
                      What is your primary purpose?{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Define the main goal of your social media presence
                    </p>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("purpose", value)
                      }
                      value={formData.purpose}
                      required
                    >
                      <SelectTrigger className="w-full mt-1 transition-all duration-200 hover:border-primary/50">
                        <SelectValue placeholder="Select your purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Personal branding">
                          Personal branding
                        </SelectItem>
                        <SelectItem value="Professional networking">
                          Professional networking
                        </SelectItem>
                        <SelectItem value="Entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="Business promotion">
                          Business promotion
                        </SelectItem>
                        <SelectItem value="Creative showcase">
                          Creative showcase
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="keywords"
                      className="text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        3
                      </span>
                      Describe yourself{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Enter 3-5 keywords that best describe you or your brand
                    </p>
                    <Input
                      id="keywords"
                      name="keywords"
                      placeholder="e.g., photographer, entrepreneur, fitness enthusiast"
                      value={formData.keywords}
                      onChange={handleChange}
                      required
                      className="mt-1 transition-all duration-200 hover:border-primary/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tone"
                      className="text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        4
                      </span>
                      Preferred tone
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Choose the tone that matches your personality
                    </p>
                    <RadioGroup
                      defaultValue={formData.tone}
                      onValueChange={(value) =>
                        handleSelectChange("tone", value)
                      }
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Professional"
                          id="professional"
                        />
                        <Label htmlFor="professional" className="text-sm">
                          Professional
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Casual" id="casual" />
                        <Label htmlFor="casual" className="text-sm">
                          Casual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Humorous" id="humorous" />
                        <Label htmlFor="humorous" className="text-sm">
                          Humorous
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Inspirational"
                          id="inspirational"
                        />
                        <Label htmlFor="inspirational" className="text-sm">
                          Inspirational
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mysterious" id="mysterious" />
                        <Label htmlFor="mysterious" className="text-sm">
                          Mysterious
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="achievements"
                      className="text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        5
                      </span>
                      Achievements or credentials
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Add any notable achievements or credentials (optional)
                    </p>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      placeholder="e.g., Award-winning designer, 10+ years experience, etc."
                      value={formData.achievements}
                      onChange={handleChange}
                      className="mt-1 transition-all duration-200 hover:border-primary/50 focus:border-primary min-h-[80px] sm:min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="interests"
                      className="text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        6
                      </span>
                      Main interests or passions
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Share your main interests or passions (optional)
                    </p>
                    <Textarea
                      id="interests"
                      name="interests"
                      placeholder="e.g., Travel photography, sustainable fashion, etc."
                      value={formData.interests}
                      onChange={handleChange}
                      className="mt-1 transition-all duration-200 hover:border-primary/50 focus:border-primary min-h-[80px] sm:min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base font-medium flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                        7
                      </span>
                      Additional elements
                    </Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Customize your bio with these optional elements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="useEmojis"
                          name="useEmojis"
                          checked={formData.useEmojis}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, useEmojis: checked })
                          }
                        />
                        <Label htmlFor="useEmojis" className="text-sm">
                          Include emojis
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="useHashtags"
                          name="useHashtags"
                          checked={formData.useHashtags}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, useHashtags: checked })
                          }
                        />
                        <Label htmlFor="useHashtags" className="text-sm">
                          Include hashtags
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="useCta"
                          name="useCta"
                          checked={formData.useCta}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, useCta: checked })
                          }
                        />
                        <Label htmlFor="useCta" className="text-sm">
                          Include call-to-action
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 bg-muted/20 p-4 sm:p-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={resetForm}
                  disabled={isGenerating}
                  className="w-full sm:w-auto transition-all duration-200 hover:bg-muted group relative overflow-hidden"
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
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                </Button>
                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full sm:w-auto transition-all duration-200 hover:bg-primary/90 relative overflow-hidden group"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
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
                          className="transition-transform duration-200 group-hover:scale-110"
                        >
                          <path d="M12 2v4" />
                          <path d="M12 18v4" />
                          <path d="m4.93 4.93 2.83 2.83" />
                          <path d="m16.24 16.24 2.83 2.83" />
                          <path d="M2 12h4" />
                          <path d="M18 12h4" />
                          <path d="m4.93 19.07 2.83-2.83" />
                          <path d="m16.24 7.76 2.83-2.83" />
                        </svg>
                        Generate Bio Options
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="results" className="p-0">
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-3 sm:px-6">
              {bioOptions.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-muted/50 p-4 rounded-md mb-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sparkles"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        <path d="M5 3v4" />
                        <path d="M19 17v4" />
                        <path d="M3 5h4" />
                        <path d="M17 19h4" />
                      </svg>
                      {formData.platform} Bio Options
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Choose the bio that best represents you. Click "Copy" to
                      use it on your profile.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {bioOptions.map((bio, index) => (
                      <BioOption
                        key={index}
                        bio={bio}
                        index={index}
                        platform={formData.platform}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-10">
                  <p className="text-sm sm:text-base">
                    No bio options generated yet.
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-muted/20 p-4 sm:p-6">
              <Button
                variant="outline"
                onClick={() => setActiveTab("form")}
                className="w-full transition-all duration-200 hover:bg-muted"
              >
                Back to Editor
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="mt-4 sm:mt-6 text-center text-muted-foreground text-xs sm:text-sm">
        <p>Find the perfect bio to make your social media profile stand out!</p>
      </div>
    </div>
  );
};

export default BioGenerator;
