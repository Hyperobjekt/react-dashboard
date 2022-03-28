import useLocationState from "./useLocationState";

/**
 * Returns the "removeSelected" function from the store.
 * @returns {function} function that removes the provided id to the selected locations if it exists
 */
function useRemoveLocation() {
  return useLocationState("removeSelected");
}

export default useRemoveLocation;
