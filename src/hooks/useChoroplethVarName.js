import { useChoroplethContext } from ".";
import { useAccessor } from "../Config";

/**
 * Returns the variable name for the choropleth data point
 * @returns {string}
 */
export default function useChoroplethVarName() {
  const accessor = useAccessor();
  const context = useChoroplethContext();
  return accessor(context);
}
