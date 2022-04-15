import create from "zustand";

/**
 * Default mapping of state keys to route params
 *
 */
export const DEFAULT_VARMAP = {
  choroplethMetric: "c",
  bubbleMetric: "b",
  subgroup: "s",
  region: "r",
  year: "y",
  zoom: "z",
  latitude: "lat",
  longitude: "lon",
  locations: "l",
};

/**
 * Zustand store for Router module. Stores the following state for global access:
 *
 * - `varMap`: maps state keys to query param names (eg. `{choroplethMetric: "c"}` maps the `choroplethMetric` state key to the `c` query param)
 * - `setVarMap`: setter to change the state to query param naming.
 * - `queryParams`: the current query params for the URL.
 * - `setQueryParams`: setter to update the query params for the URL.
 *
 * Select individual items from the store with:
 *
 * ```js
 * const queryParams = useRouteStore((state) => state.queryParams);
 * ```
 *
 * Or select multiple with:
 *
 * ```js
 * import shallow from "zustand/shallow";
 * const [queryParams, setQueryParams] = useRouteStore((state) => [state.queryParams, state.setQueryParams], shallow);
 * ```
 *
 * @function
 * @param {function} selectState a function that accepts the full state in the store and returns the desired values.
 * @param {function} comparator a comparator function that compares the last state selection to the current one.  Be sure to set this if selecting multiple items from the state.
 * @returns {*} the selected values from the store
 */
export const useRouteStore = create((set) => ({
  // an object that maps state values to query param names
  varMap: DEFAULT_VARMAP,
  setVarMap: (varMap) => set({ varMap }),
  // an object that contains all query param values
  queryParams: {},
  setQueryParams: (queryParams) => set({ queryParams }),
  // include global setter to allow extending
  set,
}));

export default useRouteStore;
