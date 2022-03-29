import union from "@turf/union";
import Color from "color";
import { getPositionScale } from "@hyperobjekt/scales";
import deepmerge from "deepmerge";

/**
 * Returns an array of from / to values with the given number of steps between.
 * (e.g. for mapping values to bubble radius)
 */
export function getLinearRamp(from, to, steps = 1) {
  // adjust from extent if values are equal
  if (from && from[0] === from[1]) from = [0, from[1]];
  if (from[0] === from[1]) from = [0, 1];
  const fromInterpolator = getPositionScale("linear", [0, 1], from);
  const toInterpolator = getPositionScale("linear", [0, 1], to);
  const values = [];
  for (let i = 0; i <= steps; i++) {
    values.push(fromInterpolator(i / steps));
    values.push(toInterpolator(i / steps));
  }
  return values;
}

/**
 * Returns an array of position / color pairs to use for continuous
 * color gradients.
 * (e.g. for mapping values to colors)
 * @param {Array} from - [min, max]
 * @param {function} to - scale functon that maps 0 - 1 to a color (or other value)
 * @param {number} steps - number of steps to include in the returned array (more steps = smoother gradient)
 */
export function getInterpolatedSteps(from, to, steps = 1) {
  if (!from || !Number.isFinite(from[0]) || !Number.isFinite(from[1]))
    from = [0, 1];
  const fromInterpolator = getPositionScale("linear", [0, 1], from);
  const toInterpolator = to;
  const values = [];
  for (let i = 0; i <= steps; i++) {
    values.push(fromInterpolator(i / steps));
    values.push(toInterpolator(i / steps));
  }
  return values;
}

/**
 * Takes the color "chunks" for the given color scale and returns
 * a color / value pair for each to use for fill styles.
 * @param {*} chunks
 * @returns
 */
export function getStepsFromChunks(chunks) {
  const steps = [];
  chunks.forEach((chunk, i) => {
    if (i === 0) steps.push(chunk.color);
    steps.push(chunk.value[0]);
    steps.push(chunk.color);
  });
  return steps;
}

/**
 * Takes multiple features and returns a single feature with the union of their geometry
 * @param {Array<GeoJSON.Feature>} features
 * @returns {GeoJSON.Feature}
 */
export function combineFeatures(features) {
  return features.length > 0
    ? features.reduce(
        (combined, f) =>
          combined ? union(combined, f, { properties: f.properties }) : f,
        null
      )
    : features;
}

/**
 * Get line width steps for different regions
 * @param {string} region
 * @returns {Array<number>} array of [zoom_level0, line_width0, zoom_level1, line_width1, ...]
 */
const getLineWidths = (region) => {
  switch (region) {
    case "states":
      return [3, 1, 6, 2, 10, 4];
    case "cities":
      return [8, 1, 12, 4];
    case "tracts":
      return [10, 1, 20, 3];
    default:
      return [1, 1.5];
  }
};

/**
 * Gets a complementary color when provided a color string, used for outlines
 * @param {*} color
 * @returns
 */
const getComplementaryColor = (color) => {
  const c = Color(color);
  const luminosity = c.luminosity();
  if (luminosity > 0.8) return c.darken(0.2).desaturate(0.25).rgb().string();
  if (luminosity > 0.5) return c.darken(0.1).desaturate(0.1).rgb().string();
  if (luminosity > 0.25) return c.lighten(0.1).rgb().string();
  if (luminosity > 0.1) return c.lighten(0.4).rgb().string();
  return c.lightness(40).desaturate(0.25).rgb().string();
};

export function getRampExpression(type, varName, steps) {
  if (type === "step") return ["step", ["get", varName], ...steps];
  if (type === "linear")
    return ["interpolate", ["linear"], ["get", varName], ...steps];
  throw new Error("no ramp for type: " + type);
}

export const getLineWidthExpression = (
  minWidth,
  maxWidth,
  minZoom,
  maxZoom
) => {
  const areAllNumbers = [minZoom, maxZoom, minWidth, maxWidth].every((v) =>
    Number.isFinite(v)
  );
  if (!areAllNumbers) return 0;
  if (minWidth === maxWidth) return minWidth;
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    minZoom,
    minWidth,
    maxZoom,
    maxWidth,
  ];
};

export const getColorExpression = (
  varName,
  color,
  noDataColor = "transparent"
) => {
  if (!color) return "transparent";
  return ["case", ["!=", ["get", varName], null], color, noDataColor];
};

export function getCaseExpression(varName, truthyValue, falsyValue) {
  return ["case", ["!=", ["get", varName], null], truthyValue, falsyValue];
}

export function getComplementarySteps(steps) {
  return steps.map((step) => {
    if (Number.isFinite(step)) return step;
    return getComplementaryColor(step);
  });
}

/**
 * Returns layer style for choropleth fill layer
 * @param {LayerContext} context
 * @returns {Array<mapboxgl.Layer>} [layer]](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)
 */
export function getChoroplethFillLayer({ varName, fillColor, baseLayer }) {
  return {
    id: `${varName}-fill`,
    type: "fill",
    paint: {
      "fill-color": fillColor,
    },
    interactive: true,
    ...baseLayer,
  };
}

/**
 * Returns layer style for choropleth outlines layer
 * @param {LayerContext} context
 * @returns {Array<mapboxgl.Layer>} [Layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)
 */
export const getChoroplethOutlineLayer = ({
  varName,
  lineColor,
  lineWidth,
  baseLayer,
}) => {
  return {
    id: `${varName}-outline`,
    type: "line",
    paint: {
      "line-color": lineColor,
      "line-width": lineWidth,
    },
    ...baseLayer,
  };
};

export const getChoroplethHoverLayers = ({
  varName,
  lineColor,
  lineWidth,
  casingColor,
  casingWidth,
  baseLayer,
}) => {
  return [
    {
      id: `${varName}-hoverCasing`,
      type: "line",
      paint: {
        "line-color": casingColor,
        "line-width": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          lineWidth + casingWidth,
          0,
        ],
      },
      ...baseLayer,
    },
    {
      id: `${varName}-hoverOutline`,
      type: "line",
      paint: {
        "line-color": lineColor,
        "line-width": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          lineWidth,
          0,
        ],
      },
      ...baseLayer,
    },
  ];
};

/**
 * Returns layer style for choropleth fill layer
 * @param {LayerContext} context
 * @returns {Array<mapboxgl.Layer>} [layer]](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)
 */
export function getBubbleFillLayers(context) {
  const {
    rampType,
    varName,
    region_id: region,
    steps,
    zoomBuffer,
    beforeId = "water",
    min_zoom,
    max_zoom,
    autoSwitch,
  } = context;
  const fillRule = getRampExpression(rampType, varName, steps);
  // base layer where fills are visible at all zooms
  const baseLayer = {
    id: `${region}-bubble`,
    source: `${region}`,
    "source-layer": `${region}-centers`,
    type: "circle",
    minzoom: min_zoom,
    maxzoom: max_zoom,
    paint: {
      "circle-color": [
        "case",
        ["!=", ["get", varName], null],
        fillRule,
        "transparent",
      ],
      "fill-opacity": 1,
    },
    beforeId,
    interactive: true,
  };
  // auto switch overrides so regions are only visible at certain zooms
  const autoSwitchOverrides = {
    minzoom: min_zoom - zoomBuffer,
    maxzoom: max_zoom + zoomBuffer,
    paint: {
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        min_zoom - zoomBuffer,
        0,
        min_zoom,
        1,
        max_zoom,
        1,
        max_zoom + zoomBuffer,
        0,
      ],
    },
  };
  // merge in the auto switch overrides if auto switch is enabled
  return [autoSwitch ? deepmerge(baseLayer, autoSwitchOverrides) : baseLayer];
}

export const getBubbleFillLayer = ({
  varName,
  circleStrokeColor,
  circleStrokeWidth,
  circleColor,
  circleRadius,
  baseLayer,
}) => {
  return {
    id: `${varName}-bubble`,
    type: "circle",
    paint: {
      "circle-color": circleColor,
      "circle-radius": circleRadius,
      "circle-stroke-color": circleStrokeColor,
      "circle-stroke-width": circleStrokeWidth,
    },
    interactive: true,
    ...baseLayer,
  };
};

export const getBubbleOutlineLayer = ({
  varName,
  lineColor,
  lineWidth,
  circleRadius,
  baseLayer,
}) => {
  return {
    id: `${varName}-outline`,
    type: "circle",
    paint: {
      "circle-color": "transparent",
      "circle-stroke-color": lineColor,
      "circle-stroke-width": lineWidth,
      "circle-radius": circleRadius,
    },
    ...baseLayer,
  };
};

export function getChoroplethLayers(varName, scale, layerConfig) {
  const {
    source_id,
    source_layer,
    min_zoom,
    max_zoom,
    min_linewidth,
    max_linewidth,
    line_color,
    na_line_color = "#ccc",
    na_fill_color = "#eee",
    hover_color = "#f00",
    hover_linewidth = 2,
    casing_color = "#fff",
    casing_linewidth = 4,
    beforeId,
    outlineBeforeId,
  } = layerConfig;
  const baseLayer = (() => {
    const result = { source: source_id };
    if (source_layer) result["source-layer"] = source_layer;
    if (min_zoom) result["minzoom"] = min_zoom;
    if (max_zoom) result["maxzoom"] = max_zoom;
    if (beforeId) result["beforeId"] = beforeId;
    return result;
  })();
  const {
    color,
    chunks,
    ScaleProps: { min, max },
  } = scale;
  const extent = [min, max];
  const rampType = chunks ? "step" : "linear";
  const fillSteps =
    rampType === "step"
      ? getStepsFromChunks(chunks)
      : getInterpolatedSteps(extent, color.copy().domain([0, 1]), 24);

  const fillColorExpression = getRampExpression(rampType, varName, fillSteps);
  const fillColor = getColorExpression(
    varName,
    fillColorExpression,
    na_fill_color
  );
  const lineColorExpression =
    line_color === "auto"
      ? getRampExpression(rampType, varName, getComplementarySteps(fillSteps))
      : line_color;
  const lineColor = getColorExpression(
    varName,
    lineColorExpression,
    na_line_color
  );
  const lineWidth = getLineWidthExpression(
    min_linewidth,
    max_linewidth,
    min_zoom,
    max_zoom
  );
  const fillLayer = getChoroplethFillLayer({ varName, fillColor, baseLayer });
  const outlineLayer = getChoroplethOutlineLayer({
    varName,
    lineColor,
    lineWidth,
    baseLayer: outlineBeforeId
      ? { ...baseLayer, beforeId: outlineBeforeId }
      : baseLayer,
  });
  const hoverLayers = getChoroplethHoverLayers({
    varName,
    lineColor: hover_color,
    lineWidth: hover_linewidth,
    casingColor: casing_color,
    casingWidth: casing_linewidth,
    baseLayer: outlineBeforeId
      ? { ...baseLayer, beforeId: outlineBeforeId }
      : baseLayer,
  });
  return [fillLayer, outlineLayer, ...hoverLayers];
}

export function getBubbleLayers(varName, scale, layerConfig) {
  const {
    source_id,
    source_layer,
    min_zoom,
    max_zoom,
    min_linewidth,
    max_linewidth,
    line_color,
    na_line_color = "#ccc",
    na_fill_color = "#eee",
    min_zoom_size,
    max_zoom_size,
  } = layerConfig;
  const baseLayer = (() => {
    const result = { source: source_id };
    if (source_layer) result["source-layer"] = source_layer;
    if (min_zoom) result["minzoom"] = min_zoom;
    if (max_zoom) result["maxzoom"] = max_zoom;
    return result;
  })();
  const {
    color,
    size,
    chunks,
    ScaleProps: { min, max },
  } = scale;
  const extent = [min, max];
  const rampType = "linear";
  const sizeSteps = [
    "interpolate",
    ["linear"],
    ["get", varName],
    extent[0],
    chunks[0],
    extent[1],
    chunks[chunks.length - 1],
  ];
  const fillSteps = getInterpolatedSteps(
    extent,
    color.copy().domain([0, 1]),
    4
  );
  const fillColorExpression = getRampExpression(rampType, varName, fillSteps);
  const circleColor = getColorExpression(
    varName,
    fillColorExpression,
    na_fill_color
  );
  const circleRadius = [
    "interpolate",
    ["linear"],
    ["zoom"],
    min_zoom,
    [
      "case",
      ["!=", ["get", varName], null],
      [
        "interpolate",
        ["linear"],
        ["get", varName],
        ...getLinearRamp(extent, min_zoom_size),
      ],
      1,
    ],
    max_zoom,
    [
      "case",
      ["!=", ["get", varName], null],
      [
        "interpolate",
        ["linear"],
        ["get", varName],
        ...getLinearRamp(extent, max_zoom_size),
      ],
      6,
    ],
  ];
  const lineColorExpression =
    line_color === "auto"
      ? getRampExpression(rampType, varName, getComplementarySteps(fillSteps))
      : line_color;
  const lineColor = getColorExpression(
    varName,
    lineColorExpression,
    na_line_color
  );
  const lineWidth = getLineWidthExpression(
    min_linewidth,
    max_linewidth,
    min_zoom,
    max_zoom
  );
  const fillLayer = getBubbleFillLayer({
    varName,
    circleStrokeColor: "#fff",
    circleStrokeWidth: 1,
    circleColor,
    circleRadius,
    baseLayer,
  });
  // const outlineLayer = getBubbleOutlineLayer({
  //   varName,
  //   lineColor: "#fff",
  //   lineWidth: 1,
  //   circleRadius,
  //   baseLayer,
  // });
  return [fillLayer];
}
