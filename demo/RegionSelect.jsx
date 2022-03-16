import React from "react";
import { useRegionOptions, useDashboardState } from "../src";

export const RegionSelect = (props) => {
  const regionOptions = useRegionOptions();
  const region = useDashboardState("region");
  const setRegion = useDashboardState("setRegion");
  const handleSelect = (e) => {
    setRegion(e.target.value);
  };
  return (
    <div {...props}>
      <label htmlFor="region_select">Region</label>
      <select id="region_select" value={region} onChange={handleSelect}>
        {regionOptions.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
