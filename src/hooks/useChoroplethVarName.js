import { useAccessor } from "../Config";
import { useChoroplethContext } from "../Map";

/**
 * Returns the variable name for the choropleth data point
 * @returns {string}
 */
export default function useChoroplethVarName() {
  const accessor = useAccessor();
  const context = useChoroplethContext();
  return accessor(context);
}
