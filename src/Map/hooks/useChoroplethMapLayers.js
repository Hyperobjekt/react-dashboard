import { useAccessor, useMapLayersConfig } from "../../Config";
import { useChoroplethScale } from "../../hooks";
import { getChoroplethLayers } from "../utils";
import useChoroplethContext from "./useChoroplethContext";

export default function useChoroplethMapLayers() {
  const accessor = useAccessor();
  const choroplethContext = useChoroplethContext();
  const choroplethVarName = accessor(choroplethContext);
  const choroplethScale = useChoroplethScale(choroplethContext);
  const choroplethMapLayerConfig = useMapLayersConfig(choroplethContext);
  console.log(choroplethMapLayerConfig);
  return choroplethMapLayerConfig
    .map((config) =>
      getChoroplethLayers(choroplethVarName, choroplethScale, config)
    )
    .flat();
}
