import { useCurrentContext } from "../../hooks";
import { useMapLayersConfig } from "../../Config";

/**
 * Returns the map layer configuration for the active bubble.
 */
export default function useBubbleLayerConfig() {
  const { bubbleMetric, subgroup_id, region_id, year } = useCurrentContext();
  return useMapLayersConfig({
    metric_id: bubbleMetric,
    subgroup_id,
    region_id,
    year,
    type: "bubble",
  });
}
