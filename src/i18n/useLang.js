import useLanguageStore from "./store";
import { useMemo } from "react";
import { interpolateString } from ".";

/**
 * Returns the language string for the given key. You can optionally pass
 * multiple keys, or a context object to interpolate data into a Mustache
 * template format.
 */
export default function useLang(keys, context) {
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
        console.debug("useLang: key not found", key);
        return "";
      }
      if (!context) return lang[key];
      return interpolateString(lang[key], context);
    });
    return values.length === 1 ? values[0] : values;
  }, [keys, language, dict, context]);
}
