import { useCallback } from "react";
import { interpolateKey } from "../../utils";
import useAppConfig from "./useAppConfig";

/**
 * Returns the data key for the current context
 * @returns
 */
export default function useAccessor() {
  const accessorKey = useAppConfig("accessor");
  return useCallback(
    (context) => {
      if (!accessorKey) return context?.metric_id;
      return interpolateKey(accessorKey, context);
    },
    [accessorKey]
  );
}
