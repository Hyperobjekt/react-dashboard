/**
 * Returns the query params for the current URL.
 * @function
 * @returns {object} an object of query params
 */
export function getCurrentUrlQueryParams() {
  if (!window?.location?.search) return new URLSearchParams();
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

/**
 * Sets the query params with the provided values.
 * @function
 * @param {object} values an object of query params
 * @returns {void}
 */
export function setUrlQueryParams(values) {
  const queryParams = new URLSearchParams(values);
  const paramString = queryParams.toString();
  const newValue = `${window?.location?.pathname}?${paramString}`;
  window?.history?.replaceState({}, "", newValue);
}

/**
 * @typedef RouteState
 * @type {object}
 * @property {string} bubbleMetric - bubble metric identifier
 * @property {string} choroplethMetric - choropleth metric identifier
 * @property {string} region - region identifier
 * @property {string} subgroup - subgroup identifier
 * @property {string} year - year
 * @property {number} latitude - latitude
 * @property {number} longitude - longitude
 * @property {number} zoom - zoom level
 * @property {Object[]} selected - array of selected location features
 */

/**
 * Takes a state object and maps it to a query params object
 * @function
 * @param {object} options
 * @param {RouteState} options.state current state for the dashboard
 * @param {object} options.varMap a mapping from state names to query param names.
 * @returns {object} query params to set for the route
 */
export const mapStateToQueryParams = ({ state = {}, varMap } = {}) => {
  // map locations to their ids
  if (state.locations) {
    state.locations = state.locations.map((f) => f.properties.GEOID).join("-");
  }
  // map all of the parameter values to names in the var map
  return Object.keys(state).reduce((acc, key) => {
    const value = state[key];
    // only add the param if it has a value
    if (value) {
      acc[varMap[key] || key] = value;
    }
    return acc;
  }, {});
};

/**
 * Reverses the state key -> route param mapping
 *
 * Example:
 * ```js
 * const varMap = { choroplethMetric: "c" };
 * const result = reverseVarMap(varMap);
 * // result = { c: "choroplethMetric" }
 * ```
 *
 * @param {object} varMap
 * @returns {object} route param -> state key mapping
 */
export const reverseVarMap = (varMap) => {
  return Object.keys(varMap).reduce((acc, key) => {
    acc[varMap[key]] = key;
    return acc;
  }, {});
};

/**
 * Takes route params and the mapping of state key -> route param and returns
 * an object with state values based on the param
 *
 * Example:
 * ```js
 * const varMap = { choroplethMetric: "c" };
 * const params = { c: "pop" };
 * const result = mapParamsToStateValues(params, varMap);
 * // result = { choroplethMetric: "pop" }
 * ```
 *
 * @param {*} params values of route parameters
 * @param {*} varMap an object of state key -> route param key
 * @returns {object} state values
 */
export const mapParamsToStateValues = (params, varMap) => {
  const reversedVarMap = reverseVarMap(varMap);
  return Object.keys(params).reduce((acc, key) => {
    const stateKey = reversedVarMap[key] || key;
    acc[stateKey] = params[key];
    return acc;
  }, {});
};
