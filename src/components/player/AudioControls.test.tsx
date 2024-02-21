import { ReactNode } from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { CustomAudioContext } from "@contexts/CustomAudioContext";

import { AudioControls } from "./AudioControls";

const renderWithinContext = (
  ui: ReactNode,
  { providerProps = {}, ...renderOptions },
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

describe("AudioControls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render with the correct buttons", () => {
    renderWithinContext(<AudioControls />, {});

    const prevSongButton = screen.getByLabelText("previous song button");
    const nextSongButton = screen.getByLabelText("next song button");
    const getPlayButton = screen.getByLabelText("play/pause song");

    expect(prevSongButton).toBeInTheDocument();
    expect(nextSongButton).toBeInTheDocument();
    expect(getPlayButton).toBeInTheDocument();
  });

  test("should trigger play/pause method when clicking them", async () => {
    const user = userEvent.setup();
    const mockToggleIsPlaying = vi.fn();

    renderWithinContext(<AudioControls />, {
      providerProps: {
        toggleIsPlaying: mockToggleIsPlaying,
      },
    });

    const playButton = screen.getByLabelText("play/pause song");

    await user.click(playButton);
    expect(mockToggleIsPlaying).toHaveBeenCalledTimes(1);

    await user.click(playButton);
    expect(mockToggleIsPlaying).toHaveBeenCalledTimes(2);
  });

  describe("Play/Pause icon being displayed according to isPlaying value", () => {
    test.each([
      { isPlaying: false, icon: "play" },
      { isPlaying: true, icon: "pause" },
    ])(
      "should show $icon icon when isPlaying is set to $isPlaying",
      ({ isPlaying, icon }) => {
        const contextProps = {
          isPlaying,
        };

        renderWithinContext(<AudioControls />, { providerProps: contextProps });

        const visibleIcon = screen.getByLabelText(`${icon} icon`);
        expect(visibleIcon).toBeVisible();
      },
    );
  });

  test("when clicking previous/next song button, should trigger the respective method", async () => {
    const user = userEvent.setup();

    const mockToNextTrack = vi.fn();
    const mockToPreviousTrack = vi.fn();

    renderWithinContext(<AudioControls />, {
      providerProps: {
        toPreviousTrack: mockToPreviousTrack,
        toNextTrack: mockToNextTrack,
      },
    });

    const prevTrackButton = screen.getByLabelText("previous song button");
    const nextTrackButton = screen.getByLabelText("next song button");

    await user.click(prevTrackButton);
    expect(mockToPreviousTrack).toHaveBeenCalledTimes(1);

    await user.click(nextTrackButton);
    expect(mockToNextTrack).toHaveBeenCalledTimes(1);
  });
});
