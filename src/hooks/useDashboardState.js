import useDashboardStore from "../store";

/**
 * Helper hook for selecting single items from dashboard store
 * @param {string} key the key that corresponds to the item in the store
 * @returns
 */
export default function useDashboardState(key) {
  return useDashboardStore((state) => state[key]);
}
