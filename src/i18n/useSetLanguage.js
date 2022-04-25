import { useLangStore } from ".";

/**
 * Returns a function to set the language dictionary for the given language
 * @returns {function} (language: string, [dict: object]) => void
 */
function useSetLanguage() {
  return useLangStore((state) => state.setLanguage);
}

export default useSetLanguage;
