import useLocationFeature from "./useLocationFeature";

/**
 * Returns the feature properties for a location
 * @param {string|number} prop optional string with the id of the location to return, or number to return latest `n` feature data
 * @returns {Array|Object}
 */
function useLocationData(prop) {
  const features = useLocationFeature(prop);
  if (Array.isArray(features)) return features.map((f) => f?.properties);
  if (typeof features === "object") return features?.properties;
  // should be an array or an object.  if not, warn and return what we have
  console.warn("useLocationData: unexpected value for location feature");
  return features;
}

export default useLocationData;
