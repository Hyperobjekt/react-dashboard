import { areEqual } from "../utils";
import useLocationState from "./useLocationState";

export default function useLocationFeature(id) {
  const features = useLocationState("selected");
  if (!id) return features;
  return features.find((f) => areEqual(f, { properties: { GEOID: id } }));
}
