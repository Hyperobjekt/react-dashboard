import { useCallback } from "react";
import { useConfigStore } from "..";
import { useLangStore } from "../../i18n";

/**
 * Loads a config object
 */
export default function useLoadConfig() {
  const loadConfig = useConfigStore((state) => state.loadConfig);
  const loadLanguageDict = useLangStore((state) => state.loadLanguageDict);

  return useCallback(
    (config) => {
      // separate lang from other configs (they go in a separate store)
      const { lang = {}, ...configEntries } = config;
      // load configs
      const configPromises = Object.keys(configEntries).map((key) => {
        const entry = config[key];
        return loadConfig(key, entry);
      });
      // load languages
      const langPromises = Object.keys(lang).map((key) => {
        const url = lang[key];
        return loadLanguageDict(key, url).then((dict) => {
          return {
            type: "lang",
            lang: key,
            dict,
          };
        });
      });
      // combine promises and set ready once all have resolved.
      return Promise.all([configPromises, langPromises].flat()).then(
        (configs) => {
          return configs.reduce((acc, config) => {
            if (!config || !config.type) return acc;
            if (config.type === "lang" && !acc["lang"]) {
              acc["lang"] = {};
              acc["lang"][config.lang] = config.dict;
              return acc;
            }
            acc[config.type] = config.config;
            return acc;
          }, {});
        }
      );
    },
    [loadConfig, loadLanguageDict]
  );
}
