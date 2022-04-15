import useRouteStore from "./store";
import {
  getCurrentUrlQueryParams,
  mapParamsToStateValues,
  reverseVarMap,
} from "./utils";

/**
 * Pulls a state object based on the current query parameters.
 * @returns {object}
 */
function useCurrentRouteParams() {
  const params = getCurrentUrlQueryParams();
  const varMap = useRouteStore((state) => state.varMap);
  const result = mapParamsToStateValues(params, varMap);
  return result;
}

export default useCurrentRouteParams;
