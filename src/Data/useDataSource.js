import { autoType } from "d3-dsv";
import { useQuery } from "react-query";
import { fetchDataSource } from "./utils";

/**
 * Wrapper for [useQuery](https://react-query.tanstack.com/reference/useQuery). Returns react-query result for the provided data source.
 * @param {string} url a URL to fetch data from (either CSV or JSON)
 * @param {function} parser (optional) a function that parses a CSV row or JSON data (default: [d3.autoType](https://github.com/d3/d3-dsv#autoType))
 * @returns {object} `useQuery` result (see [react-query docs](https://react-query.tanstack.com/reference/useQuery))
 */
function useDataSource(url, parser = autoType) {
  const hasUrl = Boolean(url);
  return useQuery({
    queryKey: url || "nullQuery",
    queryFn: async () => {
      if (!hasUrl) return Promise.reject("No URL provided");
      const data = await fetchDataSource(url, parser);
      return data;
    },
    // The query will not execute until a URL is provided
    enabled: hasUrl,
    retry: hasUrl ? 3 : false,
  });
}

export default useDataSource;
