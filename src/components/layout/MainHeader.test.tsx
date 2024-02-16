import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MainHeader } from "./MainHeader";

// vi.mock("react-router-dom", () => ({
//   ...vi.importActual("react-rounter-dom"),
//   useLocation: () => ({ pathname: "/search" }),
//   useNavigate: vi.fn(),
// }));

// vi.mock("@clerk/clerk-react", () => ({
//   ...vi.importActual("@clerk/clerk-react"),
//   useUser: () => ({ user: { username: "testuser" } }),
// }));

describe.skip("MainHeader", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("default render", () => {
    const wrapper = render(<MainHeader />);
    console.log(wrapper);
  });
});
