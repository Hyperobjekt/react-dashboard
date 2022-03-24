import create from "zustand";
import { areEqual } from "./utils";

/**
 * This store contains active selections for the dashboard
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
  removeSelected: (selected) =>
    set((state) => {
      // should provide a feature to remove
      if (typeof selected !== "object")
        console.warn("removeSelected: expected object");
      return { selected: state.selected.filter((f) => !areEqual(f, selected)) };
    }),
  // checks and see if a feature is already selected
  isSelected: (feature) => get().selected.some((f) => areEqual(f, feature)),
}));

export default useLocationStore;
