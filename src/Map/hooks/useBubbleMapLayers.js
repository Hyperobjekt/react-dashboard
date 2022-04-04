import { useAccessor, useMapLayersConfig } from "../../Config";
import { useBubbleContext, useBubbleScale } from "../../hooks";
import { getBubbleLayers } from "../utils";

export default function useBubbleMapLayers({
  context: contextOverrides,
  scale: scaleOverrides,
  createLayer = getBubbleLayers,
} = {}) {
  const accessor = useAccessor();
  const context = useBubbleContext(contextOverrides);
  const bubbleVarName = accessor(context);
  const bubbleScale = useBubbleScale({ context, config: scaleOverrides });
  const bubbleMapLayerConfig = useMapLayersConfig(context);
  return bubbleMapLayerConfig
    .map((config) => createLayer(bubbleVarName, bubbleScale, config))
    .flat();
}
