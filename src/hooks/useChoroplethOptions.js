import { useMemo } from "react";
import { useMetricConfig } from "../Config";

/**
 * Returns an array of metric options for choropleth layers
 * @returns {Array<MetricConfig>}
 */
export default function useChoroplethOptions() {
  const metricConfig = useMetricConfig();
  return useMemo(() => {
    return metricConfig.filter((m) => m.type === "choropleth");
  }, [metricConfig]);
}
