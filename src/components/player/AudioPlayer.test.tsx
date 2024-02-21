import { ReactNode } from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { CustomAudioContext } from "@contexts/CustomAudioContext";
import { AudioPlayer } from "./AudioPlayer";

const renderWithinContext = (
  ui: ReactNode,
  { providerProps, ...renderOptions },
) => {
  return render(
    <CustomAudioContext.Provider value={providerProps}>
      {ui}
    </CustomAudioContext.Provider>,
    {
      ...renderOptions,
    },
  );
};

describe("AudioPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render with correct values for duration, maxDuration", () => {
    const testContextProps = {
      duration: 300,
      trackProgress: 25,
    };
    renderWithinContext(<AudioPlayer />, { providerProps: testContextProps });
    const progressBar = screen.getByLabelText("song progress bar");
    const currentTimeValue = screen.getByLabelText("current song time");
    const songDurationValue = screen.getByLabelText("song duration");

    expect(progressBar).toBeInTheDocument();
    expect(currentTimeValue).toBeVisible();
    expect(currentTimeValue).toHaveTextContent("00:25");
    expect(songDurationValue).toBeVisible();
    expect(songDurationValue).toHaveTextContent("05:00");
  });

  test("should trigger onScrub method when clicking the progress bar", async () => {
    const testContextProps = {
      onScrub: vi.fn(),
    };

    renderWithinContext(<AudioPlayer />, { providerProps: testContextProps });
    screen.debug();
    const progressBar = screen.getByLabelText("song progress bar");

    expect(progressBar).toBeVisible();
  });
});
