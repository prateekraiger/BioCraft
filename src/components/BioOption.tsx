import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Check, Copy, AlertCircle } from "lucide-react";

interface BioOptionProps {
  bio: string;
  index: number;
  platform: string;
}

const BioOption: React.FC<BioOptionProps> = ({ bio, index, platform }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const charCount = bio.length;
  const maxChars =
    {
      Instagram: 150,
      Twitter: 160,
      LinkedIn: 220,
      WhatsApp: 80,
      Facebook: 101,
    }[platform] || 150;

  const handleCopy = () => {
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseEnter = () => {
    if (charCount > maxChars * 0.9) {
      setShowWarning(true);
    }
  };

  const handleMouseLeave = () => {
    setShowWarning(false);
  };

  return (
    <Card className="group relative overflow-hidden border-l-4 border-l-black/10 transition-all duration-300 hover:border-l-black/30 hover:shadow-md">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Badge
              variant={charCount > maxChars ? "destructive" : "secondary"}
              className="transition-colors duration-200 text-sm"
            >
              {charCount}/{maxChars} chars
            </Badge>
            <span className="text-sm text-black/60 font-medium">
              Option {index + 1}
            </span>
          </div>
          {charCount > maxChars && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Exceeds {platform} limit</span>
            </div>
          )}
        </div>

        <div
          className="relative bg-black/5 p-4 sm:p-6 rounded-md transition-colors duration-200 hover:bg-black/10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="text-base sm:text-lg whitespace-pre-wrap break-words text-black/80 leading-relaxed">
            {bio}
          </p>
          {showWarning && (
            <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center rounded-md">
              <p className="text-red-500 text-sm font-medium">
                This bio exceeds the recommended length for {platform}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-black/5 p-4 sm:p-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto transition-all duration-200 hover:bg-black hover:text-white group relative overflow-hidden text-sm"
                onClick={handleCopy}
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      Copy Bio
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black text-white">
              <p className="text-sm">Click to copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default BioOption;
