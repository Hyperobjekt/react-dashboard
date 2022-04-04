import { useMetricConfig } from "../Config";
import useCurrentContext from "./useCurrentContext";

/**
 * Returns the current bubble metric (with labels + formatter)
 * @returns {object}
 */
export default function useBubbleMetric() {
  const { bubbleMetric } = useCurrentContext();
  return useMetricConfig(bubbleMetric);
}
