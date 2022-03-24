import { areEqual } from "../utils";
import useLocationState from "./useLocationState";

/**
 * Returns an array of selected location features.
 * @param {string|number} prop - optional id to return a specific location, or number to return latest `n` features
 * @returns {Array<MapFeature>|MapFeature}
 */
export default function useLocationFeature(prop) {
  const features = useLocationState("selected");
  // no location id or limit provided, return all features
  if (!prop) return features;
  // number provided as arg, limit to the n most recent locations
  if (typeof prop === "number") return features.slice(-1 * prop);
  // string provided as arg, return the feature with that id
  if (typeof prop === "string")
    return features.find((f) => areEqual(f, { properties: { GEOID: prop } }));
  console.warn(
    "useLocationFeature: unexpected argument, returning all features"
  );
  return features;
}
