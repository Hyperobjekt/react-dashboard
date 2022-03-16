import { useAccessor, useMapLayersConfig } from "../../Config";
import { useBubbleScale } from "../../hooks";
import { _getBubbleLayers, _getChoroplethLayers } from "../utils";
import useBubbleContext from "./useBubbleContext";

export default function useBubbleMapLayers() {
  const accessor = useAccessor();
  const bubbleContext = useBubbleContext();
  const bubbleVarName = accessor(bubbleContext);
  const bubbleScale = useBubbleScale(bubbleContext);
  const bubbleMapLayerConfig = useMapLayersConfig(bubbleContext);
  console.log(bubbleMapLayerConfig);
  return bubbleMapLayerConfig
    .map((config) => _getBubbleLayers(bubbleVarName, bubbleScale, config))
    .flat();
}
