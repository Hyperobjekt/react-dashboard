import React from "react";
import ReactJson from "react-json-view";
import {
  useAppConfig,
  useBubbleContext,
  useChoroplethContext,
  useConfig,
  useCurrentContext,
  useDataSourceConfig,
  useLangStore,
  useMapLayersConfig,
  useMetricConfig,
  useRegionConfig,
  useChoroplethScale,
  useScaleConfig,
  useSubgroupConfig,
  useMapSources,
  useBubbleScale,
  useChoroplethMapLayerContext,
  getChoroplethLayers,
  _getChoroplethLayers,
} from "../src";
import useAccessor from "../src/Config/hooks/useAccessor";
import useBubbleMapLayers from "../src/Map/hooks/useBubbleMapLayers";

const shouldCollapse = ({ name }) => {
  return ["bubbles", "choropleths", "config", "root"].indexOf(name) === -1;
};

function Json() {
  const accessor = useAccessor();
  // choropleth hooks
  const choroplethContext = useChoroplethContext();
  const choroplethVarName = accessor(choroplethContext);
  const choroplethScale = useChoroplethScale(choroplethContext);
  const choroplethMapLayerConfig = useMapLayersConfig(choroplethContext);
  const choropethMapLayers = choroplethMapLayerConfig
    .map((config) =>
      _getChoroplethLayers(choroplethVarName, choroplethScale, config)
    )
    .flat();
  // bubble hooks
  const bubbleContext = useBubbleContext();
  const bubbleVarName = accessor(bubbleContext);
  const bubbleScale = useBubbleScale(bubbleContext);
  const bubbleMapLayerConfig = useMapLayersConfig(bubbleContext);
  const bubbleMapLayers = useBubbleMapLayers();
  // config hooks
  const appConfig = useAppConfig();
  const metricConfig = useMetricConfig();
  const regionConfig = useRegionConfig();
  const subgroupConfig = useSubgroupConfig();
  const mapLayerConfig = useConfig("mapLayers");
  const dataSourcesConfig = useConfig("dataSources");
  const scalesConfig = useConfig("scales");
  // lang hooks
  const langConfig = useLangStore((state) => state.dict);
  // map hooks
  const mapSources = useMapSources();

  // const bubbleScale = useScale(bubbleContext);
  const json = {
    bubbles: {
      bubbleVarName,
      bubbleContext,
      bubbleScale,
      bubbleMapLayerConfig,
      bubbleMapLayers,
    },
    choropleths: {
      choroplethVarName,
      choroplethContext,
      choroplethScale,
      choroplethMapLayerConfig,
      // choroplethMapLayerContext,
      choropethMapLayers,
    },
    config: {
      app: appConfig,
      metrics: metricConfig,
      regions: regionConfig,
      subgroups: subgroupConfig,
      scales: scalesConfig,
      mapLayers: mapLayerConfig,
      dataSources: dataSourcesConfig,
      lang: langConfig,
    },
    map: {
      mapSources,
    },
  };
  return <ReactJson src={json} shouldCollapse={shouldCollapse} />;
}

export default Json;
