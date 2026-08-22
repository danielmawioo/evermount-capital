import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HelpCenterPage from "./page";

describe("HelpCenterPage", () => {
  it("renders the help center heading and FAQs", () => {
    render(<HelpCenterPage />);

    expect(
      screen.getByRole("heading", { name: /Help Center/ }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("How do I deposit funds into my account?").length,
    ).toBeGreaterThan(0);
  });

  it("expands an FAQ answer when clicked", async () => {
    const user = userEvent.setup();
    render(<HelpCenterPage />);

    const question = screen.getAllByText(
      "How do I deposit funds into my account?",
    )[0];
    await user.click(question);

    expect(
      screen.getAllByText(/Navigate to the Wallets page/).length,
    ).toBeGreaterThan(0);
  });

  it("filters FAQs by search term", async () => {
    const user = userEvent.setup();
    render(<HelpCenterPage />);

    await user.type(
      screen.getByPlaceholderText("Search for help articles..."),
      "minimum investment",
    );

    expect(
      screen.getAllByText("What is the minimum investment amount?").length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByText("Is my money safe and secure?"),
    ).not.toBeInTheDocument();
  });

  it("submits the contact form", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<HelpCenterPage />);

    await user.type(screen.getByPlaceholderText("Your name"), "Jane Doe");
    await user.type(
      screen.getByPlaceholderText("your@email.com"),
      "jane@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("What can we help with?"),
      "Deposit issue",
    );
    await user.type(
      screen.getByPlaceholderText("Tell us more about your question..."),
      "My deposit did not arrive.",
    );
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(alertSpy).toHaveBeenCalledWith(
      "Thank you for contacting us! We'll get back to you within 24 hours.",
    );
    alertSpy.mockRestore();
  });
});
