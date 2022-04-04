import { useConfig } from ".";
import { getAllMatches } from "..";
/**
 * Returns the best match in the map sources config for the provided context.
 * @param {object} context context used to match the map sources
 * @returns {object[]} an array of map source config objects
 */
export default function useMapSourceConfig(context) {
  const mapSources = useConfig("mapSources");
  return getAllMatches(context, mapSources);
}
