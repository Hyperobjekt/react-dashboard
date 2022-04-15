import create from "zustand";
import { areEqual } from "./utils";

/**
 * A [zustand](https://github.com/pmndrs/zustand/blob/main/readme.md) store that contains active selections for the dashboard.
 *
 * It is recommended that you use the provided hooks instead of accessing the store directly.  However, the store can be accessed directly if desired.  Be sure to follow the [zustand conventions](https://github.com/pmndrs/zustand/blob/main/readme.md#selecting-multiple-state-slices) for accessing store values.
 *
 * The store contains the following keys:
 * - `selected`: an array of selected locations
 * - `addSelected`: a function that adds a location to the selected locations
 * - `removeSelected`: a function that removes a location from the selected locations
 * - `isSelected`: a function that returns true if the provided feature is a selected location.
 *
 * **Example:**
 * ```js
 * // returns the selected locations from the store
 * const selected = useLocationStore((state) => state.selected);
 * ```
 * @function
 * @param {function} stateSelector selector function that returns the state slice
 * @returns {*}
 */
export const useLocationStore = create((set, get) => ({
  selected: [],
  // function that adds a feature to the selected array if it doesn't already exist
  addSelected: (selected) =>
    set((state) => {
      const alreadyExists = state.selected.some((f) => areEqual(f, selected));
      if (alreadyExists) return {};
      return { selected: [...state.selected, selected] };
    }),
  // removes a feature from the selected array
  removeSelected: (selectedId) =>
    set((state) => {
      // if a data obeject or feature was provided, grab the GEOID
      if (typeof selectedId === "object")
        selectedId = selectedId?.GEOID || selectedId?.properties?.GEOID;
      if (typeof selectedId !== "string") {
        console.warn("expected a GEOID string when removing a location");
        return;
      }
      return {
        selected: state.selected.filter(
          (f) => f?.properties?.GEOID !== selectedId
        ),
      };
    }),
  // checks and see if a feature is already selected
  isSelected: (feature) => get().selected.some((f) => areEqual(f, feature)),
  // include global setter for extending
  set,
}));

export default useLocationStore;
