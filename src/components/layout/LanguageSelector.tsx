'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, type LanguageCode } from '@/components/providers/LanguageProvider';

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useLanguage();

  const handleChange = (value: string) => {
    setLanguage(value as LanguageCode);
  };

  return (
    <Select value={language} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px]">
        <span className="sr-only">Select language</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {availableLanguages.map((option) => (
          <SelectItem key={option.code} value={option.code}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
