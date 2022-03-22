import useLocationState from "./useLocationState";

export default function useAddLocation() {
  return useLocationState("addSelected");
}
