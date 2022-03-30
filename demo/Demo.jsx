import React from "react";
import "./demo.css";
import Dashboard from "../src/Dashboard";
import { BubbleSelect } from "./BubbleSelect";
import { ChoroplethSelect } from "./ChoroplethSelect";
import { RegionSelect } from "./RegionSelect";
import * as LOCAL_CONFIG from "./local.config.json";
import { YearSelect } from "./YearSelect";
import { SubgroupSelect } from "./SubgroupSelect";
import Json from "./Json";
import { MapGL } from "@hyperobjekt/mapgl";
import { useMapSources } from "../src";
import useChoroplethMapLayers from "../src/Map/hooks/useChoroplethMapLayers";
import "@hyperobjekt/mapgl/dist/style.css";
import useBubbleMapLayers from "../src/Map/hooks/useBubbleMapLayers";
// import * as REMOTE_CONFIG from "./remote.config.json";

const TOKEN = `pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw`;
const MAP_STYLE = "mapbox://styles/hyperobjekt/cl007w05t000414oaog417i9s";
const US_BOUNDS = [
  [-130, 24],
  [-65, 50],
];

function Map() {
  const ref = React.useRef();
  const sources = useMapSources();
  const choroplethLayers = useChoroplethMapLayers();
  const bubbleLayers = useBubbleMapLayers();
  return (
    <MapGL
      ref={ref}
      mapboxAccessToken={TOKEN}
      mapStyle={MAP_STYLE}
      bounds={US_BOUNDS}
      sources={sources}
      layers={[...choroplethLayers, ...bubbleLayers]}
    />
  );
}

function App() {
  return (
    <Dashboard config={LOCAL_CONFIG} enableRouter>
      <div className="controls">
        <ChoroplethSelect className="select" />
        <BubbleSelect className="select" />
        <RegionSelect className="select" />
        <YearSelect className="select" />
        <SubgroupSelect className="select" />
      </div>
      <Map />
      <Json />
    </Dashboard>
  );
}

export default App;
