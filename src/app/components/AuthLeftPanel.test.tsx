import { render, screen } from "@testing-library/react";
import AuthLeftPanel from "./AuthLeftPanel";

describe("AuthLeftPanel", () => {
  it("renders the given title and the auth/logo images", () => {
    render(<AuthLeftPanel title="Welcome Back" />);

    expect(
      screen.getByRole("heading", { name: "Welcome Back" })
    ).toBeInTheDocument();
    expect(screen.getByAltText("Auth Visual")).toBeInTheDocument();
    expect(screen.getByAltText("okta")).toBeInTheDocument();
    expect(screen.getByAltText("firebase")).toBeInTheDocument();
    expect(screen.getByAltText("auth0")).toBeInTheDocument();
    expect(screen.getByAltText("supabase")).toBeInTheDocument();
  });
});
