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
 * @param {RouteState} state current state for the dashboard
 * @param {object} varMap a mapping from state names to query param names.
 * @returns {object} query params to set for the route
 */
export const mapStateToQueryParams = (state = {}, varMap) => {
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
