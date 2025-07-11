
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
      className={cn("flex items-center space-x-2", className)}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'vi' ? 'EN' : 'VI'}
      </span>
    </Button>
  );
};
