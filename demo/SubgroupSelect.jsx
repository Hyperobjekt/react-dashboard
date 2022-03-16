import React from "react";
import { useSubgroupOptions, useDashboardState } from "../src";

export const SubgroupSelect = (props) => {
  const options = useSubgroupOptions();
  const subgroup = useDashboardState("subgroup");
  const setSubgroup = useDashboardState("setSubgroup");
  const handleSelect = (e) => {
    setSubgroup(e.target.value);
  };
  return (
    <div {...props}>
      <label htmlFor="subgroup_select">Subgroup</label>
      <select id="subgroup_select" value={subgroup} onChange={handleSelect}>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
