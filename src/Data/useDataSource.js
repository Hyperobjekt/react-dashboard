import { autoType } from "d3-dsv";
import { useQuery } from "react-query";
import { interpolateString } from "../i18n";
import { fetchDataSource } from "./utils";

/**
 * Returns react-query result for the provided data source.
 * @param {object} dataSource a data source config entry
 * @param {object} options (optional) context for URL interpolation, parser function for returned data.
 */
export default function useDataSource(url, parser = autoType) {
  return useQuery(
    url,
    async () => {
      const data = await fetchDataSource(url, parser);
      return data;
    },
    {
      // The query will not execute until a URL is provided
      enabled: !!url,
    }
  );
}
