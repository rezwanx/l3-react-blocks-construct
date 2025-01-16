// import { sendLangInfoToServer } from "@/actions/server-side-actions";
import { useState, useEffect } from 'react';
function useLanguage() {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    const sendToServer = async () => {
      await sendLangInfoToServer(language);
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }
    };
    sendToServer();
  }, [language]);

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
