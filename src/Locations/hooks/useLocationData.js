import useLocationFeature from "./useLocationFeature";

export default function useLocationData(id) {
  const features = useLocationFeature(id);
  if (Array.isArray(features)) return features.map((f) => f?.properties);
  if (typeof features === "object") return features?.properties;
  console.warn("useLocationData: unexpected value for location feature");
  return features;
}
