import { useSubgroupConfig } from "../Config";

/**
 * Returns an array of subgroup options (alias of useSubgroupConfig)
 * @returns {Array<SubgroupConfig>}
 */
export default function useSubgroupOptions() {
  return useSubgroupConfig();
}
