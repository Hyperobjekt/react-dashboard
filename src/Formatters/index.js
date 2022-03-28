import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

// Number formats to use based on value
const PRECISION_FORMATS = {
  0.001: format(".4~f"), // fixed to 4 decimal places
  0.01: format(".3~f"), // fixed to 3 decimal places
  0.1: format(".3~f"), // fixes to 3 decimal places
  1: format(".2~f"), // fixed to 2 decimal places
  100: format(".1~f"), // fixed to 1 decimal place
  1000: format(",d"), // integer, comma separator
  10000: format(".2~s"), // 2 sig figs, use SI prefix
  100000: format(".3~s"), // 3 sig figs, use SI prefix
  1000000: format(".3~s"), // 3 sig figs, use SI prefix
  10000000: format(".3~s"), // 3 sig figs, use SI prefix
};

/**
 * Determines the number precision and returns a short formatted string with appropriate sig figs.
 * (e.g. 12000000 -> 1.2M)
 * @param {number} num
 * @returns {string}
 */
export const autoFormatNumber = (num) => {
  num = Number(num);
  const precisionKeys = Object.keys(PRECISION_FORMATS);
  const intervals = precisionKeys.map((k) => Number(k));
  // use largest formatter if number is larger than largest interval
  if (num > 10000000) return PRECISION_FORMATS[10000000](num);
  // loop through precision intervals and return formatter if number is within interval
  for (let i = 0; i < intervals.length; i++) {
    if (num < intervals[i]) {
      return PRECISION_FORMATS[precisionKeys[i]](num);
    }
  }
};

/**
 * Formats full integer values, adding commas for thousands
 * (e.g. 1234567 -> 1,234,567)
 * @param {number} num
 * @returns {string}
 */
export const formatInteger = format(",d"); // 123

/**
 * Formats short integer values
 * (e.g. 1200 -> 1.2k)
 * @param {number} num
 * @returns {string}
 */
export const formatIntegerShort = format("~s");

/**
 * Formats decimal numbers to the given precision (eg. 123.456789 -> 123.46)
 * @param {number} value
 * @param {number} precision
 * @returns {string}
 */
export const formatDecimal = (value, precision = 2) =>
  format(`,.${precision}f`)(value); // 123.46 (when precision = 2)

/**
 * Formats date to ISO string (yyyy-mm-dd) (e.g. 2018-01-02)
 * @param {Date} date
 * @returns {string}
 */
export const formatDate8601 = timeFormat("%Y-%m-%d");

/**
 * Formats date to short format (e.g. Jan 2, '18)
 * @param {Date} date
 * @returns {string}
 */
export const formatShortDate = timeFormat("%b %d, '%y");

/**
 * Formats date to full format (e.g. January 2, 2018)
 * @param {Date} date
 * @returns {string}
 */
export const formatFullDate = timeFormat("%B %d, %Y");

/**
 * Formats date to full month name (e.g. January)
 * @param {Date} date
 * @returns {string}
 */
export const formatMonth = timeFormat("%B");

/**
 * Formats date to short month name (e.g. Jan)
 * @param {Date} date
 * @returns {string}
 */
export const formatShortMonth = timeFormat("%b");

/**
 * Formats date to short month day (e.g. Jan 2)
 * @param {Date} date
 * @returns {string}
 */
export const formatMonthDay = timeFormat("%b %d");

/**
 * Formats date to short month year (e.g. Jan '18)
 * @param {Date} date
 * @returns {string}
 */
export const formatMonthYear = timeFormat("%b '%y");

/**
 * Formats decimal values to percent with 2 sig figs (e.g. 0.5 -> 50%)
 * @param {number} value
 * @returns {string}
 */
export const formatPercent = format(".2~p");

/**
 * Formats a number value to full dollar amount with commas.  No cents will be shown. (e.g. 1234567.89 -> $1,234,567)
 * @param {number} value
 * @returns {string}
 */
export const formatDollars = format("$,d"); // $123,456

/**
 * Formats a number value to a shortened currency format (e.g. 1234567 -> $1.2M)
 * @param {*} value
 * @returns {string}
 */
export const formatCurrency = (value) => `$${autoFormatNumber(value)}`;

/**
 * Formats a number value to full dollar amount with commas and cents. (e.g. 1234567.89 -> $1,234,567.89)
 * @param {number} value
 * @returns {string}
 */
export const formatFullCurrency = format("$,.2~f");

/**
 * Formats a truthy value to "Yes" or a falsy value to "No"
 * @param {number|boolean|string} v
 * @returns {string}
 */
export const formatYesNo = (v) => (v ? "Yes" : "No");

/**
 * Formats a truthy value to "On" or a falsy value to "Off"
 * @param {number|boolean|string} v
 * @returns {string}
 */
export const formatOnOff = (v) => (v ? "On" : "Off");

/**
 * A pass-through function that returns the value provided
 * @param {*} value
 * @returns {*}
 */
export const formatNothing = (value) => value; // no formatting

/**
 * Formats a number value to a percentage with 2 sig figs.  Does not multiply by 100 (use formatPercent instead for that case).  (e.g. 12.34 -> 12.34%)
 * @param {number} value
 * @returns {string}
 */
export const formatPercentValue = (value) => autoFormatNumber(value) + "%"; // adds a percent sign, assums percent has already been calculated

/**
 * Provides a formatter function based on the provided type string.  Available types include:
 * - number (123456789 -> 12.34M)
 * - integer (123456789 -> 123,456,789)
 * - integer_short (123456789 -> 12M)
 * - float (123.456789 -> 123.46)
 * - date (-> 2018-01-02)
 * - full_date (-> January 2, 2018)
 * - short_date (-> Jan 2, '18)
 * - month (-> January)
 * - short_month (-> Jan)
 * - month_day (-> Jan 2)
 * - month_year (-> Jan '18)
 * - percent (0.5 -> 50%)
 * - dollars (123456789 -> $1,234,567)
 * - currency (123456789 -> $1.2M)
 * - full_currency (123456789 -> $1,234,567.89)
 * - yes_no (true -> Yes, false -> No)
 * - on_off (true -> On, false -> Off)
 * @param {string} type
 * @returns {function}
 */
export const getFormatter = (type) => {
  switch (type) {
    case "number":
      return autoFormatNumber;
    case "integer":
      return formatInteger;
    case "interger_short":
      return formatIntegerShort;
    case "float":
      return formatDecimal;
    case "date":
      return formatDate8601;
    case "full_date":
      return formatFullDate;
    case "short_date":
      return formatShortDate;
    case "month":
      return formatMonth;
    case "short_month":
      return formatShortMonth;
    case "month_day":
      return formatMonthDay;
    case "month_year":
      return formatMonthYear;
    case "percent":
      return formatPercent;
    case "percent_value":
      return formatPercentValue;
    case "dollars":
      return formatDollars;
    case "currency":
      return formatCurrency;
    case "full_currency":
      return formatFullCurrency;
    case "yes_no":
      return formatYesNo;
    case "on_off":
      return formatOnOff;
    default:
      return formatNothing;
  }
};
