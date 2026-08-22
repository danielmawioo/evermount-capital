import { render, screen } from "@testing-library/react";
import NotFoundPage from "./not-found";

describe("NotFoundPage", () => {
  it("renders the not-found message and a link back home", () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Sorry, page not found!/i,
      }),
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Go to Home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
