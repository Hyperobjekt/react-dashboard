import { useConfig } from ".";
import { getAllMatches } from "..";
import { interpolateKey } from "../../utils";

/**
 * Returns the best match in the map layers config for the provided context.
 * @param {object} context context used to match the map layer
 */
export default function useMapLayersConfig(context) {
  const mapLayers = useConfig("mapLayers");
  return getAllMatches(context, mapLayers).map((layerConfig) => {
    const overrides = {};
    // populate source id with any context values (e.g. {{yy}})
    if (layerConfig.source_id) {
      overrides.source_id = interpolateKey(layerConfig.source_id, context);
    }
    return {
      ...layerConfig,
      ...overrides,
    };
  });
}
