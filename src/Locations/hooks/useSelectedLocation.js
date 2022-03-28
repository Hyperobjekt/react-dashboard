import { useMapState } from "@hyperobjekt/mapgl";

/**
 * Returns the selected (clicked) feature on the map.
 * @returns {MapFeature}
 */
function useSelectedLocation() {
  return useMapState("selectedFeature");
}

export default useSelectedLocation;
