import create from "zustand";
import { loadLanguage } from "./utils";

/**
 * Zustand store for i18n module.
 *
 * Select individual items from the store with:
 *
 * ```js
 * const language = useLangStore((state) => state.language);
 * ```
 *
 * Or select multiple with:
 *
 * ```js
 * import shallow from "zustand/shallow";
 * const [language, setLanguage] = useLangStore((state) => [state.language, state.setLanguage], shallow);
 * ```
 *
 * @function
 * @param {function} selectState a function that accepts the full state in the store and returns the desired values.
 * @param {function} comparator a comparator function that compares the last state selection to the current one.  Be sure to set this if selecting multiple items from the state.
 * @returns {*} the selected values from the store
 */
const useLangStore = create((set, get) => ({
  language: "en",
  setLanguage: (language, dict) => {
    if (typeof language !== "string")
      throw new Error("Language must be a string identifier");
    const result = {};
    result["language"] = language;
    if (typeof dict === "object")
      result["dict"] = { ...get().dict, [language]: dict };
    set(result);
  },
  dict: { en: {} },
  setLanguageDict: (dict) => set({ dict }),
  loadLanguageDict: async (language, url, activate = false) => {
    const langDictionary = await loadLanguage(language, url);
    console.debug(`loaded '${language}' language dictionary`, langDictionary);
    const updates = {};
    updates["dict"] = { ...get().dict, [language]: langDictionary };
    if (activate) updates["language"] = language;
    if (!get().ready) updates["ready"] = true;
    set(updates);
    return langDictionary;
  },
  ready: false,
}));

export default useLangStore;
