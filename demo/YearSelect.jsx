import React from "react";
import { useYearOptions, useDashboardState } from "../src";

export const YearSelect = (props) => {
  const options = useYearOptions();
  const year = useDashboardState("year");
  const setYear = useDashboardState("setYear");
  const handleSelect = (e) => {
    setYear(e.target.value);
  };
  return (
    <div {...props}>
      <label htmlFor="year_select">Year</label>
      <select id="year_select" value={year} onChange={handleSelect}>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
