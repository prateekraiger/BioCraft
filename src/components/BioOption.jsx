import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy, AlertCircle } from "lucide-react";

const BioOption = ({ bio, index, platform }) => {
  const [copied, setCopied] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
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
    <Card className="group relative overflow-hidden border-l-4 border-l-primary/50 transition-all duration-300 hover:border-l-primary hover:shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Badge
              variant={charCount > maxChars ? "destructive" : "secondary"}
              className="transition-colors duration-200"
            >
              {charCount}/{maxChars} chars
            </Badge>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Option {index + 1}
            </span>
          </div>
          {charCount > maxChars && (
            <div className="flex items-center gap-1 text-destructive text-xs sm:text-sm">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Exceeds {platform} limit</span>
            </div>
          )}
        </div>

        <div
          className="relative bg-muted/30 p-3 sm:p-4 rounded-md transition-colors duration-200 hover:bg-muted/50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
            {bio}
          </p>
          {showWarning && (
            <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center rounded-md">
              <p className="text-destructive text-xs sm:text-sm font-medium">
                This bio exceeds the recommended length for {platform}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-muted/20 p-3 sm:p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto transition-all duration-200 hover:bg-primary hover:text-primary-foreground group relative overflow-hidden"
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
            <TooltipContent
              side="top"
              className="bg-primary text-primary-foreground"
            >
              <p className="text-xs sm:text-sm">Click to copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default BioOption;
