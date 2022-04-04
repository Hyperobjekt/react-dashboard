import { useMetricConfig } from "../Config";
import useCurrentContext from "./useCurrentContext";

/**
 * Returns the current choropleth metric (with labels + formatter)
 * @returns {object}
 */
export default function useChoroplethMetric() {
  const { choroplethMetric } = useCurrentContext();
  return useMetricConfig(choroplethMetric);
}
