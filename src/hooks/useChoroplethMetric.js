import { useMetricConfig } from "../Config";
import { useChoroplethContext } from "../Map";

/**
 * Returns the current choropleth metric (with labels + formatter)
 * @returns {object}
 */
export default function useChoroplethMetric() {
  const { metric_id } = useChoroplethContext();
  return useMetricConfig(metric_id);
}
