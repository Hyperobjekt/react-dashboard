import { useAccessor } from "../Config";
import useBubbleContext from "./useBubbleContext";

/**
 * Returns the variable name for the bubble data point
 * @returns {string}
 */
export default function useBubbleVarName() {
  const accessor = useAccessor();
  const context = useBubbleContext();
  return accessor(context);
}
