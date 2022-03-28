import useLocationState from "./useLocationState";

/**
 * Returns the "addSelected" function from the store.
 * @returns {function} function that adds the provided feature to the selected locations if it doesn't exist
 */
function useAddLocation() {
  return useLocationState("addSelected");
}

export default useAddLocation;
