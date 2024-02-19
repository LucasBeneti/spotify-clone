import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import { AudioPlayer } from "./AudioPlayer";
import { AudioContextProvider } from "@contexts/CustomAudioContext";

// TODO I have to figure out if there's need to test the context
// and how should I do it
const testSong = {
  id: 11,
  name: "Song Name",
  album_id: 23,
  album_name: "Album Name",
  author_id: "1",
  artist_name: "Artist Name",
  cover_art: "coverart source",
  position_on_album: "4",
  source_link: "song actual source",
  times_played: 433,
  duration: 289,
};

const testProviderProps = {
  value: {
    tracks: [testSong, testSong, testSong], // fill in Song test array
    audioElementRef: null,
    duration: 289,
    isPlaying: false,
    trackProgress: 30,
    toggleIsPlaying: vi.fn(),
    addTrackToQueue: vi.fn(),
    playSongNow: vi.fn(),
    toPreviousTrack: vi.fn(),
    toNextTrack: vi.fn(),
    currentlyPlaying: testSong, // Song object here
    onScrub: vi.fn(),
    volume: [10],
    handleVolumeChange: vi.fn(),
    toggleAudioMute: vi.fn(),
  },
};

const renderWithinContext = (
  ui: ReactNode,
  { providerProps = testProviderProps, ...renderOptions },
) => {
  return render(<AudioContextProvider>{ui}</AudioContextProvider>, {
    ...renderOptions,
  });
};

describe("AudioPlayer", () => {
  test("should render with default most outer components", () => {
    renderWithinContext(<AudioPlayer />, {});
    const progressBar = screen.getByLabelText("song progress bar");

    expect(progressBar).toBeInTheDocument();
  });
});
