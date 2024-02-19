import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { PlaylistItem } from "./PlaylistItem";

describe("PlaylistItem", () => {
  test("should render with at least the name prop", () => {
    const playlistTestName = "playlist name";

    render(<PlaylistItem name={playlistTestName} />);

    const playlistCover = screen.getByRole("img");
    const playlistName = screen.getByText(playlistTestName);

    expect(playlistCover).toBeInTheDocument();
    expect(playlistName).toBeInTheDocument();
  });

  test("should render with given props", () => {
    const testProps = {
      name: "playlist name",
      type: "Playlist",
      author: "test user",
      pinned: true,
    };

    render(<PlaylistItem {...testProps} />);

    const playlistCoverImg = screen.getByRole("img");
    const playlistTitle = screen.getByLabelText("playlist title");
    const pinnedIcon = screen.getByLabelText("pinned playlist");
    const playlistType = screen.getByLabelText("playlist type");
    const playlistAuthor = screen.getByLabelText("playlist author");

    expect(playlistCoverImg).toBeInTheDocument();
    expect(playlistCoverImg).toHaveAttribute("aria-label", "playlist cover");
    expect(playlistTitle).toHaveTextContent(testProps.name);
    expect(pinnedIcon).toBeInTheDocument();
    expect(playlistType).toHaveTextContent(testProps.type);
    expect(playlistAuthor).toHaveTextContent(testProps.author);
  });
});
