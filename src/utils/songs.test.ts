import { describe, test, expect } from "vitest";

import { getSongDurationInMinutes } from "./songs";

describe("songs -> utils functions", () => {
  test.each([
    [300, "05:00"],
    [133, "02:13"],
    [24, "00:24"],
    [0, "00:00"],
  ])("should return value converted to minutes", (intValue, expectedString) => {
    const convertedValue = getSongDurationInMinutes(intValue);
    expect(convertedValue).toBe(expectedString);
  });
});
