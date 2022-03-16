import { useMemo } from "react";
import { useMetricConfig } from "../Config";

/**
 * Returns an array of metric options for bubble layers
 * @returns {Array<MetricConfig>}
 */
export default function useBubbleOptions() {
  const metricConfig = useMetricConfig();
  return useMemo(() => {
    return metricConfig.filter((m) => m.type === "bubble");
  }, [metricConfig]);
}
