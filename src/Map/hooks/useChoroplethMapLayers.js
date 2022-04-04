import { useAccessor, useMapLayersConfig } from "../../Config";
import { useChoroplethContext, useChoroplethScale } from "../../hooks";
import { getChoroplethLayers } from "../utils";

export default function useChoroplethMapLayers({
  context: contextOverrides,
  scale: scaleOverrides,
  createLayer = getChoroplethLayers,
} = {}) {
  const accessor = useAccessor();
  const context = useChoroplethContext(contextOverrides);
  const choroplethVarName = accessor(context);
  const choroplethScale = useChoroplethScale({
    context,
    config: scaleOverrides,
  });
  const choroplethMapLayerConfig = useMapLayersConfig(context);
  const layers = choroplethMapLayerConfig
    .map((config) => createLayer(choroplethVarName, choroplethScale, config))
    .flat();

  return layers;
}
