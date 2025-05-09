import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { loadTranslations } from './i18n';
import {
  useAvailableLanguages,
  useAvailableModules,
} from 'components/blocks/language-selector/hooks/use-language';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => Promise<void>;
  isLoading: boolean;
  availableLanguages: any[];
  availableModules: any[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
  defaultModules?: string[];
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'en-US',
  defaultModules = ['common', 'auth'],
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || defaultLanguage;
    }
    return defaultLanguage;
  });

  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const { data: languages = [] } = useAvailableLanguages();
  const { data: modules = [] } = useAvailableModules();

  // Function to change language
  const setLanguage = async (language: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }

      // Check if we have modules from the API
      if (modules && modules.length > 0) {
        // We're authenticated, load translations for each module
        for (const module of modules) {
          try {
            await loadTranslations(language, module.moduleName);
          } catch (err) {
            console.error(`Failed to load translations for module ${module.moduleName}:`, err);
          }
        }
      } else {
        // We're likely in auth flow or modules API failed
        // Load predefined modules for auth flow
        for (const moduleName of defaultModules) {
          try {
            await loadTranslations(language, moduleName);
          } catch (err) {
            console.error(`Failed to load translations for module ${moduleName}:`, err);
          }
        }
      }

      // Update i18n language
      i18n.changeLanguage(language);

      // Update state
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize translations on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      setIsLoading(true);
      try {
        // Try to load translations for all modules
        await setLanguage(currentLanguage);
      } catch (error) {
        console.error('Failed to initialize translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTranslations();
    // We only want to run this on mount, and the dependencies are used within the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentLanguage,
    setLanguage,
    isLoading,
    availableLanguages: languages,
    availableModules: modules,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
