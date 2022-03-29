/**
 * Returns the region type based on the GEOID
 * @param {string} geoid
 * @returns {string} "states", "counties", "cities", "tracts", "bg"
 */
export function getRegionFromGeoid(geoid) {
  switch (geoid.length) {
    case 2:
      return "states";
    case 5:
      return "counties";
    case 11:
      return "tracts";
    case 7:
      return "cities";
    case 12:
      return "bg";
    default:
      throw new Error("Could not determine region type from geoid");
  }
}

/**
 * Returns the parent identifiers for a given geoid
 * @param {string} geoid
 * @returns {{state: string, county: string, tract: string, city: string, bg: string}}
 */
export function getLocationContextFromGeoid(geoid) {
  if (typeof geoid !== "string" || geoid.length < 2) return {};
  return {
    state: getStateFromGeoid(geoid),
    county: getCountyFromGeoid(geoid),
    city: getCityFromGeoid(geoid),
    tract: getTractFromGeoid(geoid),
    bg: getBlockGroupFromGeoid(geoid),
  };
}

/**
 * Returns the state portion of a geoid.
 * @param {string} geoid
 * @returns {string}
 */
export function getStateFromGeoid(geoid) {
  if (typeof geoid !== "string" || geoid.length < 2) return null;
  return geoid.substring(0, 2);
}

/**
 * Returns the county portion for a geoid.
 * @param {string} geoid
 * @returns {string}
 */
export function getCountyFromGeoid(geoid) {
  if (typeof geoid !== "string" || geoid.length < 5) return null;
  return geoid.substring(0, 5);
}

/**
 * Returns the tract portion of a geoid
 * @param {string} geoid
 * @returns {string}
 */
export function getTractFromGeoid(geoid) {
  if (typeof geoid !== "string" || geoid.length < 11) return null;
  return geoid.substring(0, 11);
}

/**
 * Returns the city portion for a geoid.
 * @param {string} geoid
 * @returns {string}
 */
export function getCityFromGeoid(geoid) {
  if (typeof geoid !== "string" || geoid.length < 8) return null;
  return geoid.substring(0, 7);
}

/**
 * Returns the block group portion for a geoid.
 * @param {string} geoid
 * @returns {string}
 */
export function getBlockGroupFromGeoid(geoid) {
  if (typeof geoid !== "string" || geoid.length < 12) return null;
  return geoid.substring(0, 12);
}

/**
 * Returns true if features have the same GEOID
 * @param {GeoJsonFeature} a
 * @param {GeoJsonFeature} b
 * @returns {boolean}
 */
export function areEqual(a, b) {
  return a.properties.GEOID === b.properties.GEOID;
}

/**
 * Gets the next available color when given an array of used colors and an array of all available colors.
 * @param {string[]} usedColors
 * @param {string[]} availableColors
 * @returns {string}
 */
export function getNextColor(usedColors, availableColors) {
  // find and unused color and return if it exists
  const nextUnusedColor = availableColors.find((c) => !usedColors.includes(c));
  if (nextUnusedColor) return nextUnusedColor;
  // all colors are used, loop around to the next color after the last used color
  const lastColor = usedColors[usedColors.length - 1];
  const colorIndex = availableColors.indexOf(lastColor);
  const nextColorIndex = (colorIndex + 1) % availableColors.length;
  return availableColors[nextColorIndex];
}
