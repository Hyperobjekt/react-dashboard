import { useMapState } from "@hyperobjekt/mapgl";

/**
 * Returns the hovered feature on the map. Alias for useMapState("hoveredFeature").
 * @returns {MapFeature}
 */
function useHoveredLocation() {
  return useMapState("hoveredFeature");
}

export default useHoveredLocation;
