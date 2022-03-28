import useToggleLocation from "./useToggleLocation";

/**
 * Returns a callback function that accepts a feature and adds it to the
 * selected locations list with a color.  If the feature is already selected,
 * it will be removed from the list. (Deprecated: Use `useToggleLocation` instead.)
 * @deprecated
 * @returns {function}
 */
function useToggleSelectedLocation() {
  console.warn(
    `useToggleSelectedLocation is deprecated.  Use useToggleLocation instead.`
  );
  return useToggleLocation();
}

export default useToggleSelectedLocation;
