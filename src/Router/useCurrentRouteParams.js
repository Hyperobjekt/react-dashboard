import useRouteStore from "./store";
import { getCurrentUrlQueryParams } from "./utils";

/**
 * Pulls a state object based on the current query parameters.
 * @returns {object}
 */
function useCurrentRouteParams() {
  const params = getCurrentUrlQueryParams();
  const varMap = useRouteStore((state) => state.varMap);
  return Object.keys(varMap).reduce((acc, key) => {
    if (params[varMap[key]]) acc[key] = params[varMap[key]];
    return acc;
  }, {});
}

export default useCurrentRouteParams;
