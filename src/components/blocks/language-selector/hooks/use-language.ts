import { useQuery } from '@tanstack/react-query';
import { getLanguage, getUilmFile } from '../services/language.service';
import { LanguageResponse, UilmFileParams } from '../types/language.types';

/**
 * Custom hook to fetch language data from the UILM file
 *
 * This hook uses TanStack Query to fetch and cache language data for a specific
 * language and module. It handles loading, error states, and caching automatically.
 *
 * @param params - Parameters for the language query including language code and module name
 * @returns Query object containing:
 *  - data: The fetched language data when available
 *  - isLoading: Boolean indicating if the request is in progress
 *  - isError: Boolean indicating if the request failed
 *  - error: Error object if the request failed
 *  - refetch: Function to manually trigger a refetch
 *
 * @example
 * const { data, isLoading, error } = useLanguage({
 *   language: 'en-US',
 *   moduleName: 'dashboard'
 * });
 */
export const useLanguage = (params: UilmFileParams) => {
  const { language, moduleName } = params;

  return useQuery({
    queryKey: ['getUilmFile', language, moduleName],
    queryFn: () => getUilmFile(params),
  });
};

/**
 * Custom hook to fetch all available languages from the API
 *
 * This hook uses TanStack Query to fetch and cache the list of all available
 * languages in the system. The response is typed as LanguageResponse (array of Language objects).
 * It handles loading, error states, and caching automatically.
 *
 * @returns Query object containing:
 *  - data: Array of Language objects when available
 *  - isLoading: Boolean indicating if the request is in progress
 *  - isError: Boolean indicating if the request failed
 *  - error: Error object if the request failed
 *  - refetch: Function to manually trigger a refetch
 *
 * @example
 * const { data: languages, isLoading, error } = useAvailableLanguages();
 *
 * // Use the languages data
 * if (isLoading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 * return (
 *   <ul>
 *     {languages?.map(lang => (
 *       <li key={lang.itemId}>{lang.languageName}</li>
 *     ))}
 *   </ul>
 * );
 */
export const useAvailableLanguages = () => {
  return useQuery<LanguageResponse>({
    queryKey: ['getLanguages'],
    queryFn: () => getLanguage(),
  });
};
