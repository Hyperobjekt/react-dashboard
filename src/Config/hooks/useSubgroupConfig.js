import { useMemo } from "react";
import { useConfigStore } from "..";
import { useLangObject } from "../../i18n";

/**
 * Returns all subgroups config, or an individual subgroup config if ID is provided
 * @param {string} id (optional) subgroup ID
 * @returns {Array|object} array of subgroup configs or single subgroup config
 */
export default function useSubgroupConfig(id) {
  const subgroups = useConfigStore((state) => state.subgroups);
  const names = useLangObject(
    subgroups.map((r) => r.id),
    { prefix: "SUBGROUP_" }
  );
  return useMemo(() => {
    const subgroupsWithLang = subgroups.map((r) => {
      return {
        ...r,
        name: names[r.id],
      };
    });
    if (!id) return subgroupsWithLang;
    return subgroupsWithLang.find((r) => r.id === id);
  }, [id, subgroups, names]);
}
