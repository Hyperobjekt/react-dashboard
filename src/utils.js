import { interpolateString } from "./i18n";

/**
 * Pulls default selections from app config
 * @param {*} config
 * @returns
 */
export function getDefaultsFromConfig(config) {
  const values = {};
  const appConfig = config.app;
  values["year"] = appConfig.default_year || appConfig.years?.[0];
  values["region"] = appConfig.default_region || config.regions?.[0]?.id;
  values["subgroup"] = appConfig.default_subgroup || config.subgroups?.[0]?.id;
  values["choroplethMetric"] = appConfig.default_choropleth_metric;
  values["bubbleMetric"] = appConfig.default_bubble_metric;
  return values;
}

/**
 * Interpolates a key with provided context values.
 * The same as interpolateString, but adds some additional context.
 * @param {*} key
 * @param {*} context
 */
export function interpolateKey(key, context) {
  if (!key) return null;
  const newContext = { ...context };
  // add 2 digit year
  if (context.year?.length === 4)
    newContext["yy"] = context.year.toString().slice(-2);
  return interpolateString(key, newContext);
}
