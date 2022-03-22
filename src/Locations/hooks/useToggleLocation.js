import { useCallback } from "react";
import { useLocationStore } from "..";
import { useAppConfig } from "../../Config";
import { areEqual, getNextColor } from "../utils";

/**
 * Returns a callback function that accepts a feature and adds it to the
 * selected locations list with a color.  If the feature is already selected,
 * it will be removed from the list.
 * @returns {function}
 */
export default function useToggleLocation() {
  const locationColors = useAppConfig("location_colors");
  const selected = useLocationStore((state) => state.selected);
  const addSelected = useLocationStore((state) => state.addSelected);
  const removeSelected = useLocationStore((state) => state.removeSelected);
  return useCallback(
    (feature) => {
      if (!feature?.properties) return;
      const alreadyExists = selected.some((f) => areEqual(f, feature));
      if (alreadyExists) return removeSelected(feature);
      const selectedColors = selected.map((f) => f.properties.color);
      const color = getNextColor(selectedColors, locationColors);
      addSelected({ ...feature, properties: { ...feature.properties, color } });
    },
    [selected, locationColors, addSelected, removeSelected]
  );
}
