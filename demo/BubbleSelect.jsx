import React from "react";
import { useBubbleOptions, useDashboardState } from "../src";

export const BubbleSelect = (props) => {
  const bubbleOptions = useBubbleOptions();
  const bubbleMetric = useDashboardState("bubbleMetric");
  const setBubbleMetric = useDashboardState("setBubbleMetric");
  const handleSelect = (e) => {
    setBubbleMetric(e.target.value);
  };
  return (
    <div {...props}>
      <label htmlFor="bubble_select">Bubble Metric</label>
      <select id="bubble_select" value={bubbleMetric} onChange={handleSelect}>
        {bubbleOptions.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
