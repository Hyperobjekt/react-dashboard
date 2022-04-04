import { useMemo } from "react";
import { useMapSourceConfig } from "../../Config";
import { useCurrentContext } from "../../hooks";

/**
 * Returns map sources for the current context for use with mapboxgl.
 * @returns {Array<mapboxgl.Source>} array of [map sources](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources)
 */
export default function useMapSources() {
  const currentContext = useCurrentContext();
  const { bubbleMetric, choroplethMetric, ...restContext } = currentContext;
  const choroplethSources = useMapSourceConfig({
    metric_id: choroplethMetric,
    ...restContext,
  });
  const bubbleSources = useMapSourceConfig({
    metric_id: choroplethMetric,
    ...restContext,
  });
  return useMemo(() => {
    // return unique sources and strip out context related props
    return [...choroplethSources, ...bubbleSources].reduce(
      (uniqueSources, current) => {
        if (uniqueSources.find((source) => source.id === current.id))
          return uniqueSources;
        const { region_id, metric_id, subgroup_id, year, ...source } = current;
        uniqueSources.push(source);
        return uniqueSources;
      },
      []
    );
  }, [choroplethSources, bubbleSources]);
}
