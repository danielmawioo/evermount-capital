import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LibraryPage from "./page";

describe("LibraryPage", () => {
  it("renders the educational library and its resources", () => {
    render(<LibraryPage />);

    expect(
      screen.getByRole("heading", { name: /Educational Library/ })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Introduction to Quantitative Trading")
    ).toBeInTheDocument();
  });

  it("filters resources by search term", async () => {
    const user = userEvent.setup();
    render(<LibraryPage />);

    await user.type(
      screen.getByPlaceholderText("Search resources..."),
      "Risk Management"
    );

    expect(
      screen.getByText("Risk Management Best Practices")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Introduction to Quantitative Trading")
    ).not.toBeInTheDocument();
  });

  it("filters to bookmarked resources only", async () => {
    const user = userEvent.setup();
    render(<LibraryPage />);

    await user.click(screen.getByRole("button", { name: /Bookmarked/ }));

    expect(
      screen.getByText("Introduction to Quantitative Trading")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Risk Management Best Practices")
    ).not.toBeInTheDocument();
  });
});
