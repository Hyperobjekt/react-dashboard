import { useEffect } from "react";
import { useLangStore } from ".";

/**
 * Loads a remote language dictionary into the store from the provided URL.
 * @param {string} lang corresponding language ID
 * @param {string} url url of JSON language dictionary
 * @returns {void}
 */
function useLoadLang(lang, url) {
  const loadLanguageDict = useLangStore((state) => state.loadLanguageDict);
  useEffect(() => {
    lang && url && loadLanguageDict(lang, url);
  }, [lang, url, loadLanguageDict]);
}

export default useLoadLang;
