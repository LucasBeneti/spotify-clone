import { ReactNode } from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { AudioContextProvider } from "@contexts/CustomAudioContext";

import { AudioControls } from "./AudioControls";

// TODO separate this function to a more "common" file, to be used on
// other places
const renderWithinContext = (
  ui: ReactNode,
  { providerProps = {}, ...renderOptions },
) => {
  return render(<AudioContextProvider>{ui}</AudioContextProvider>, {
    ...renderOptions,
  });
};

describe("AudioControls", () => {
  test("should render with the correct buttons", () => {
    renderWithinContext(<AudioControls />, {});

    const prevSongButton = screen.getByLabelText("go to previous song");
    const nextSongButton = screen.getByLabelText("go to next song");
    const getPlayButton = screen.getByLabelText("play/pause song");

    expect(prevSongButton).toBeInTheDocument();
    expect(nextSongButton).toBeInTheDocument();
    expect(getPlayButton).toBeInTheDocument();
  });
});
