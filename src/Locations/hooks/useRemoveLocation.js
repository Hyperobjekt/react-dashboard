import useLocationState from "./useLocationState";

/**
 * Returns the "removeSelected" function from the store.
 * @returns {function} - function that removes the provided id to the selected locations if it exists
 */
export default function useRemoveLocation() {
  return useLocationState("removeSelected");
}
