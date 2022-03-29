import { useAccessor, useMapLayersConfig } from "../../Config";
import { useBubbleScale } from "../../hooks";
import { getBubbleLayers } from "../utils";
import useBubbleContext from "./useBubbleContext";

export default function useBubbleMapLayers() {
  const accessor = useAccessor();
  const bubbleContext = useBubbleContext();
  const bubbleVarName = accessor(bubbleContext);
  const bubbleScale = useBubbleScale(bubbleContext);
  const bubbleMapLayerConfig = useMapLayersConfig(bubbleContext);
  return bubbleMapLayerConfig
    .map((config) => getBubbleLayers(bubbleVarName, bubbleScale, config))
    .flat();
}
