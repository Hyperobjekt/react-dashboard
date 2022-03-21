import { useMemo } from "react";
import { useCurrentContext } from "../../hooks";

/**
 * Returns a context object for the choropleth based on current dashboard state
 */
export default function useChoroplethContext(overrides) {
  const { choroplethMetric, subgroup_id, region_id, year } =
    useCurrentContext();
  return useMemo(() => {
    overrides = overrides || {};
    return {
      metric_id: choroplethMetric,
      subgroup_id,
      region_id,
      year,
      type: "choropleth",
      ...overrides,
    };
  }, [choroplethMetric, subgroup_id, region_id, year, overrides]);
}
