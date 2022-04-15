import {
  useAccessor,
  useAppConfig,
  useMetricConfig,
  useScaleConfig,
} from "../Config";
import { useDataSource } from "../Data";
import { getScale } from "@hyperobjekt/scales";
import { getFormatter } from "../Formatters";
import { interpolateString } from "../i18n";
import useBubbleContext from "./useBubbleContext";

export default function useBubbleScale({
  context: contextOverrides,
  config: configOverrides,
} = {}) {
  const accessor = useAccessor();
  const context = useBubbleContext(contextOverrides);
  // pull the default choropleth colors
  const defaultColor = useAppConfig("default_bubble_colors");
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
    min_size,
    max_size,
    chunks,
    colors,
  } = scaleConfig;
  // pull the data for extents (if needed)
  const extentsUrl = extent_data && interpolateString(extent_data, context);
  const { isSuccess, data } = useDataSource(extentsUrl);
  // pull formatters for the metric
  const { format, short_format } = useMetricConfig(context.metric_id);
  const formatType = short_format || format || "number";
  const formatLabel = getFormatter(formatType);
  // if there is extents data, find the entry for the metric
  const metricEntry =
    isSuccess && data?.find((entry) => entry.id === accessor(context));
  // get the min / max extents
  const minValue = (metricEntry && metricEntry[extent_min_key]) || min || 0;
  const maxValue = (metricEntry && metricEntry[extent_max_key]) || max || 1;
  // use scale colors (if set) or fallback to default colors
  const colorValue = colors || defaultColor;
  // get the scale functions (for color, position, and any chunks)
  const scaleFns = getScale("bubble", {
    min: minValue,
    max: maxValue,
    minSize: min_size,
    maxSize: max_size,
    chunks,
    colors: colorValue,
  });
  // return props for the scale component, tick component, and scale functions
  return {
    ScaleProps: {
      type: "bubble",
      min: minValue,
      max: maxValue,
      colors: colorValue,
      chunks,
    },
    BubbleProps: {
      minSize: min_size,
      maxSize: max_size,
      formatLabel,
    },
    ...scaleFns,
  };
}
