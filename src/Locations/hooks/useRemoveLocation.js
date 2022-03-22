import useLocationState from "./useLocationState";

export default function useRemoveLocation() {
  return useLocationState("removeSelected");
}
