// import { sendLangInfoToServer } from "@/actions/server-side-actions";
import { useState, useEffect } from 'react';
function useLanguage() {
  // Initialize language state from localStorage or default to 'en'
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  // Effect to update localStorage when language state changes
  useEffect(() => {
    const sendToServer = async () => {
      await sendLangInfoToServer(language);
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }
    };
    sendToServer();
  }, [language]);

  // Function to change language
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return { language, changeLanguage };
}
export default useLanguage;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sendLangInfoToServer(language: string) {
  throw new Error('Function not implemented.');
}
