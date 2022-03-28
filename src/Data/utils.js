import { csvParse, autoType } from "d3-dsv";

export const PASS_THROUGH = (v) => v;

/**
 * Fetches a CSV or JSON file, parses it, and returns the data.
 * @param {string} url a URL to fetch data from (either CSV or JSON)
 * @param {function} parser (optional) a function that parses a CSV row or JSON data (default: [d3.autoType](
 * @returns {Promise}
 */
export const fetchDataSource = async (url, parser) => {
  const isCsv = url.endsWith(".csv");
  return fetch(url)
    .then((response) => {
      return isCsv ? response.text() : response.json();
    })
    .then((data) => {
      return isCsv ? parseCsvString(data, parser) : parseJsonData(data, parser);
    });
};

/**
 * Pulls out wildcard definitions in the ID (e.g. states_*_00 becomes states_00)
 * @param {*} id
 * @returns {string} identifier with wildcards removed
 */
export const parseId = (id) => {
  return id
    .split("_")
    .filter((v) => v !== "*")
    .join("_");
};

/**
 * Parses a value based on the provided type.  If no type is provided,
 * then d3 `autoType` is used to determine the type.
 * @param {*} value
 * @param {object} options
 * @param {string} options.type "date"|"float"|"integer"|"boolean"
 * @returns {*}
 */
export const parseValue = (value, options = {}) => {
  if (!value && value !== 0) return null;
  const type = options.type;
  switch (type) {
    case "string":
      return value;
    case "integer":
      return parseInt(value, 10);
    case "float":
      return parseFloat(value);
    case "boolean":
      return value.toLowerCase() === "true" || value === "1";
    case "date":
      // check if value is ISO 8601 date string (YYYY-MM-DD), if so set time so that returned value is local time
      if (value.match(/^\d{4}-\d{2}-\d{2}$/)) return new Date(`${value}T00:00`);
      return new Date(value);
    default:
      return autoType([value])[0];
  }
};

/**
 * Parses a string value based on the provided type and splits
 * multi-value strings separated by ";" (or provided separator option.)
 * @param {*} stringValue
 * @param {object} options {type, separator}
 * @param {string} options.type "date"|"float"|"integer"|"boolean"
 * @param {string} options.separator separator for array values (default: ";")
 * @returns {*}
 */
export const parseValues = (stringValue, options = {}) => {
  const type = options.type;
  const separator = options.separator || ";";
  if (!stringValue) return null;
  // value is already parsed, return it as is
  if (typeof stringValue !== "string") return stringValue;
  // if a single value, return parsed value
  if (stringValue.indexOf(separator) === -1)
    return parseValue(stringValue, { type });
  // if multiple values, return array of parsed values
  return stringValue.split(separator).map((v) => parseValue(v, { type }));
};

/**
 * Passes data entries through the parser function, or if the data is
 * not an array it passes the whole data through the parser function.
 * @param {*} data
 * @param {function} parser
 * @returns {Array|Object}
 */
export const parseJsonData = (data, parser = PASS_THROUGH) => {
  return Array.isArray(data) ? data.map(parser) : parser(data);
};

/**
 * Alias for csvParse with autoType. Parses a csv string into an
 * array of objects based on the parser (or autotype) function.
 * @param {string} data
 * @param {function} parser
 * @returns {Array<object>}
 */
export const parseCsvString = (data, parser = autoType) => {
  return csvParse(data, parser);
};
