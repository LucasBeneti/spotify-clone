import { ReactNode } from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CurrentlyPlaying } from "./CurrentlyPlaying";

const renderWithRouter = (component: ReactNode) => {
  return render(component, { wrapper: BrowserRouter });
};

describe("CurrentlyPlaying", () => {
  test("should render with default cover", () => {
    const defaultCoverSrc =
      "https://i.scdn.co/image/ab67616d0000b273585f3d70dce678a5978a0941";
    renderWithRouter(<CurrentlyPlaying />);

    const songCover = screen.getByRole("img");
    expect(songCover).toHaveAttribute("alt", "Default cover alt text");
    expect(songCover).toHaveAttribute("src", defaultCoverSrc);
  });

  test("should render with given props", () => {
    const props = {
      title: "Song name",
      artist: "Artist Name",
      artistId: 1,
      songCoverArt: "song cover source path",
    };

    renderWithRouter(<CurrentlyPlaying {...props} />);
    const titleCurrPlaying = screen.getByText(`${props.title}`);
    const artistCurrPlaying = screen.getByText(`${props.artist}`);
    const coverImage = screen.getByRole("img");

    expect(titleCurrPlaying).toBeInTheDocument();
    expect(artistCurrPlaying).toBeInTheDocument();
    expect(artistCurrPlaying).toHaveAttribute(
      "href",
      `/artist/${props.artistId}`,
    );
    expect(coverImage).toHaveAttribute("src", props.songCoverArt);
    expect(coverImage).toHaveAttribute(
      "alt",
      `Cover for the song ${props.title} from ${props.artist}`,
    );
  });

  test("when user clicks the artist name, should be redirected to artist page", async () => {
    const user = userEvent.setup();
    const testArtistName = "Test Name";
    const testArtistId = 1;
    const expectedArtistPagePath = `/artist/${testArtistId}`;

    renderWithRouter(
      <CurrentlyPlaying artistId={testArtistId} artist={testArtistName} />,
    );

    const artistNameLink = screen.getByText(`${testArtistName}`);
    expect(artistNameLink).toBeInTheDocument();

    await user.click(artistNameLink);
    expect(window.location.pathname).toBe(expectedArtistPagePath);
  });
});
