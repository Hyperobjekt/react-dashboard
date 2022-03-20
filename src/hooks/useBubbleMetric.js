import { useMetricConfig } from "../Config";
import { useBubbleContext } from "../Map";

/**
 * Returns the current bubble metric (with labels + formatter)
 * @returns {object}
 */
export default function useBubbleMetric() {
  const { metric_id } = useBubbleContext();
  return useMetricConfig(metric_id);
}
