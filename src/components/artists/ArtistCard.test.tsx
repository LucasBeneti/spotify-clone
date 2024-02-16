import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import { ArtistCard } from "./ArtistCard";

describe("ArtistCard", () => {
  it("should render correctly", () => {
    const artistDefaultProps = {
      name: "Artist Name",
      imgSrc: "thisartistsprofileimage",
    };
    const wrapper = render(
      <ArtistCard
        name={artistDefaultProps.name}
        imgSrc={artistDefaultProps.imgSrc}
      />,
    );
    const artistNameHeading = wrapper.getByRole("heading");

    expect(artistNameHeading).toHaveTextContent(artistDefaultProps.name);
  });
});
