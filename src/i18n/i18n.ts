import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getUilmFile } from 'components/blocks/language-selector/services/language.service';

// declare custom type options so the return is always a string.
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

// Initialize i18n instance
i18n.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  resources: {}, // Empty initially, will be loaded dynamically
});

/**
 * Load translations for a specific language and module
 *
 * @param language - Language code to load translations for
 * @param moduleName - Module name to load translations for
 * @returns Promise that resolves when translations are loaded
 */
/**
 * Load translations for a specific language and module
 *
 * This function handles fetching translations from the API and adding them to the i18n instance.
 * It includes error handling and will not throw errors to avoid breaking the UI.
 *
 * @param language - Language code to load translations for
 * @param moduleName - Module name to load translations for
 * @param retryCount - Number of retries attempted (internal use)
 * @returns Promise that resolves when translations are loaded
 */
export const loadTranslations = async (language: string, moduleName: string): Promise<void> => {
  try {
    const translations = await getUilmFile({ language, moduleName });

    if (!translations) {
      return;
    }

    // Add the translations directly to i18n resources in the default namespace
    // This allows direct access to keys without namespace prefix
    i18n.addResourceBundle(
      language,
      'translation', // Default namespace for direct key access
      translations, // The JSON object with keys and translations
      true, // Deep merge
      true // Overwrite
    );

    // Also add to the specific module namespace for organization
    // This allows accessing keys with namespace prefix if needed
    i18n.addResourceBundle(language, moduleName, translations, true, true);

    // Translation loaded successfully
  } catch (error) {
    console.error(`Failed to load translations for module ${moduleName}:`, error);
  }
};

export default i18n;
