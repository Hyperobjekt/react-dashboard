import { useChoroplethScale } from "../../hooks";
import { getStepsFromChunks } from "../utils";
import { useLocationStore } from "../../Locations";
import {
  useAccessor,
  useAppConfig,
  useMapLayersConfig,
  useRegionConfig,
} from "../../Config";
import useDashboardStore from "../../store";
import useChoroplethContext from "./useChoroplethContext";

export default function useChoroplethMapLayerContext({
  context: contextOverrides,
  scale: scaleOverrides,
} = {}) {
  return {};
  // const accessor = useAccessor();
  // const context = useChoroplethContext(contextOverrides);
  // const scale = useChoroplethScale(context, scaleOverrides);
  // const layerConfig = useMapLayersConfig(context);
  // const autoSwitch = useDashboardStore((state) => state.autoSwitchRegion);
  // const selected = useLocationStore((state) => state.selected);
  // const hoverColor = useAppConfig("hover_color");
  // const regionConfig = useRegionConfig(context.region_id);
  // const {
  //   color,
  //   chunks,
  //   ScaleProps: { min, max },
  // } = scale;
  // const extent = [min, max];
  // const steps = chunks
  //   ? getStepsFromChunks(chunks)
  //   : getLinearColorRamp(extent, color.copy().domain([0, 1]), 24);
  // return {
  //   ...context,
  //   accessor,
  //   extent,
  //   steps,
  //   chunks,
  //   color,
  //   selected,
  //   hoverColor,
  //   autoSwitch,
  //   zoomBuffer: 1,
  //   min_zoom: regionConfig?.min_zoom || 0,
  //   max_zoom: regionConfig?.max_zoom || 20,
  //   ...contextOverrides,
  // };
}
