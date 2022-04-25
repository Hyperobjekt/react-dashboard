import { useLangStore } from ".";

/**
 * Returns a function to load a remote language dictionary into the store from the provided URL.
 * @returns {function} (language: string, url: string|object) => void
 */
function useLoadLanguage() {
  return useLangStore((state) => state.loadLanguageDict);
}

export default useLoadLanguage;
