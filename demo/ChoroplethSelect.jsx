import React from "react";
import { useChoroplethOptions, useDashboardState } from "../src";

export const ChoroplethSelect = (props) => {
  const choroplethOptions = useChoroplethOptions();
  const choroplethMetric = useDashboardState("choroplethMetric");
  const setChoroplethMetric = useDashboardState("setChoroplethMetric");
  const handleSelect = (e) => {
    setChoroplethMetric(e.target.value);
  };
  return (
    <div {...props}>
      <label htmlFor="choropleth_select">Choropleth Metric</label>
      <select
        id="choropleth_select"
        value={choroplethMetric}
        onChange={handleSelect}
      >
        {choroplethOptions.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
