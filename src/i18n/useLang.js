import useLanguageStore from "./store";
import { useMemo } from "react";
import { interpolateString } from ".";

/**
 * Returns the language string for the given key. You can optionally pass
 * multiple keys, or a context object to interpolate data into a Mustache
 * template format.
 * @function
 * @param {string|Array<string>} keys an array of language keys
 * @param {object} context an optional object of values to populate the language string with
 * @returns {string|string[]} an individual language string or an array of strings
 */
function useLang(keys, context) {
  const [language, dict] = useLanguageStore((state) => [
    state.language,
    state.dict,
  ]);

  return useMemo(() => {
    if (Array.isArray(keys) && keys.length === 0) return [];
    const mapKeys = typeof keys === "string" ? [keys] : keys;
    const lang = dict[language];
    const values = mapKeys.map((key) => {
      key = key.toUpperCase();
      if (!lang[key]) {
        return "";
      }
      if (!context) return lang[key];
      return interpolateString(lang[key], context);
    });
    return values.length === 1 ? values[0] : values;
  }, [keys, language, dict, context]);
}

export default useLang;
