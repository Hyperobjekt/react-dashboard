import mustache from "mustache";

/**
 * Fetch a language file from JSON or CSV. CSV should have "key" and "value" columns.
 * JSON file should be an object of key / value pairs.
 * @function
 * @param {string} language language identifier (e.g. "en")
 * @param {string} url url of JSON file to load language from
 * @returns {Promise}
 */
export const loadLanguage = async (language, url) => {
  if (typeof language !== "string")
    throw new Error("Language must be a string identifier");
  // if we are given a language dict instead of a URL, resolve the promise with the value
  if (typeof url === "object") return Promise.resolve(url);
  if (typeof url !== "string") throw new Error("URL must be a string");
  const isCsv = url.endsWith(".csv");
  return fetch(url)
    .then((response) => (isCsv ? response.text() : response.json()))
    .then((data) => {
      if (!isCsv) return data;
      return data.reduce((dict, row) => {
        const { key, value } = row;
        dict[key] = value;
        return dict;
      }, {});
    });
};

/**
 * Replaces all occurrences of {{placeholders}} in the given string with the
 * corresponding values from the given context object.
 * @param {string} template
 * @param {object} values
 * @returns {string}
 */
export function interpolateString(template, values) {
  const matches = template.match(/{{[^}]+}}/g) || [];
  const matchKeys = matches.map((match) => match.replace(/[{}]/g, ""));
  const valueKeys = Object.keys(values);
  const missingKeys = matchKeys.filter((key) => !valueKeys.includes(key));
  if (missingKeys.length > 0)
    console.warn("Missing values for interpolation:", missingKeys);
  return mustache.render(template, values);
}
