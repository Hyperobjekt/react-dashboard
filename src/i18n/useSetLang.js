import { useEffect } from "react";
import { useLangStore } from ".";

/**
 * Sets the language dictionary for the given language
 * @param {string} lang language identifier
 * @param {object} langDict object containing key value language strings
 * @returns {void}
 */
function useSetLang(lang, langDict) {
  const setLanguage = useLangStore((state) => state.setLanguage);
  useEffect(() => {
    lang && typeof langDict === "object" && setLanguage(lang, langDict);
  }, [lang, langDict, setLanguage]);
}

export default useSetLang;
