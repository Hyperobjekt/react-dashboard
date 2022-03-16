import { useMemo } from "react";
import { useAppConfig } from "../Config";

/**
 * Returns an array of year options
 * @returns {Array<{id: string, name: string}>}
 */
export default function useYearOptions() {
  const years = useAppConfig("years");
  return useMemo(() => {
    return years.map((y) => {
      return {
        id: y,
        name: y,
      };
    });
  }, [years]);
}
