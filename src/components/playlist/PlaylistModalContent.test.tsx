import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { PlaylistModalContent } from "./PlaylistModalContent";

const minimumProps = {
  handleSaveEdit: vi.fn(),
  handleChange: vi.fn(),
};

describe("PlaylistModalContent", () => {
  test("default render", async () => {
    render(<PlaylistModalContent {...minimumProps} />);

    const saveButton = screen.getByRole("button");

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent(/Salvar/);
  });

  test("error when not inserting playlist title", async () => {
    render(<PlaylistModalContent {...minimumProps} />);
    const user = userEvent.setup();
    const errorMessageExpected =
      'Campo "Título" é obrigatório para salvar alteração.';

    const saveButton = screen.getByRole("button");
    await user.click(saveButton);

    const errorMessage = screen.getByLabelText("required title error message");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(errorMessageExpected);
  });

  // TODO implement test for saving with data inserted

  // TODO implement test for sending only title but not description
  // this should only check the on save handler function (check to see if all needed
  // data is being passed on)
});
