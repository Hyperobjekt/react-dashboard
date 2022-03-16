import { useRegionConfig } from "../Config";

/**
 * Returns an array of region options (alias of useRegionConfig)
 * @returns {Array<RegionConfig>}
 */
export default function useRegionOptions() {
  return useRegionConfig();
}
