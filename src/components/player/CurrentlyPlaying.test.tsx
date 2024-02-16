import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { CurrentlyPlaying } from "./CurrentlyPlaying";

describe("CurrentlyPlaying", () => {
  test("default render", () => {
    render(<CurrentlyPlaying />, { wrapper: BrowserRouter });

    const songImage = screen.getByRole("img");
    expect(songImage).toHaveAttribute("alt", "Album");
  });
});
