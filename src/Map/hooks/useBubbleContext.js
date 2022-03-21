import { useMemo } from "react";
import { useCurrentContext } from "../../hooks";

/**
 * Returns a context object for the bubble based on current dashboard state
 */
export default function useBubbleContext(overrides) {
  const { bubbleMetric, subgroup_id, region_id, year } = useCurrentContext();
  return useMemo(() => {
    overrides = overrides || {};
    return {
      metric_id: bubbleMetric,
      subgroup_id,
      region_id,
      year,
      type: "bubble",
    };
  }, [bubbleMetric, subgroup_id, region_id, year, overrides]);
}
