import { getScale } from "@hyperobjekt/scales";
import { useChoroplethContext } from ".";
import {
  useAccessor,
  useAppConfig,
  useMetricConfig,
  useScaleConfig,
} from "../Config";
import useDataSource from "../Data/useDataSource";
import { getFormatter } from "../Formatters";
import { interpolateString } from "../i18n";

/**
 * Takes a context object and returns `ScaleProps`, `TickProps`, and scale functions
 * @param {*} context
 * @returns
 */
export default function useChoroplethScale({
  context: contextOverrides,
  config: configOverrides,
} = {}) {
  const context = useChoroplethContext(contextOverrides);
  const accessor = useAccessor();
  // pull the default choropleth colors
  const defaultColor = useAppConfig("default_choropleth_colors");
  // pull scale config
  const baseScaleConfig = useScaleConfig(context);
  const scaleConfig = configOverrides
    ? { ...baseScaleConfig, ...configOverrides }
    : baseScaleConfig;
  const {
    extent_data,
    extent_min_key,
    extent_max_key,
    min,
    max,
    chunks,
    scale,
    colors,
  } = scaleConfig;
  // pull the data for extents (if needed)
  const extentsUrl = extent_data && interpolateString(extent_data, context);
  const { isSuccess, data } = useDataSource(extentsUrl);
  // pull formatters for the metric
  const { format, short_format } = useMetricConfig(context.metric_id);
  const formatType = short_format || format || "number";
  const tickFormat = getFormatter(formatType);
  // if there is extents data, find the entry for the metric
  const metricEntry =
    isSuccess && data?.find((entry) => entry.id === accessor(context));
  // get the min / max extents
  const minValue = (metricEntry && metricEntry[extent_min_key]) || min || 0;
  const maxValue = (metricEntry && metricEntry[extent_max_key]) || max || 1;
  // use scale colors (if set) or fallback to default colors
  const colorValue = colors || defaultColor;
  // get the scale functions (for color, position, and any chunks)
  const scaleFns = getScale(scale, {
    min: minValue,
    max: maxValue,
    chunks,
    colors: colorValue,
  });
  // setup props for the ticks on the scale
  const TickProps = { tickFormat };
  if (scaleFns?.chunks) {
    TickProps.endTicks = true;
    TickProps.tickValues = scaleFns.chunks.reduce((tickValues, chunk, i) => {
      if (i === 0) return tickValues;
      if (i === scaleFns.chunks.length - 1)
        return [...tickValues, chunk.value[0]];
      return [...tickValues, ...chunk.value];
    }, []);
  } else {
    TickProps.ticks = chunks || 5;
  }
  // return props for the scale component, tick component, and scale functions
  return {
    ScaleProps: {
      type: scale,
      min: minValue,
      max: maxValue,
      colors: colorValue,
      chunks,
    },
    TickProps,
    ...scaleFns,
  };
}
