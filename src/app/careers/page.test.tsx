import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CareersPage from "./page";

describe("CareersPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<CareersPage />);
    expect(
      screen.getByRole("heading", { name: /join the evermount mission/i }),
    ).toBeInTheDocument();
  });

  it("lists all open positions collapsed by default", () => {
    render(<CareersPage />);
    expect(
      screen.getByRole("heading", { name: /frontend engineer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /quantitative analyst/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /product designer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /marketing strategist/i }),
    ).toBeInTheDocument();

    // Details are only rendered once a job card is expanded.
    expect(screen.queryByText(/about the role/i)).not.toBeInTheDocument();
  });

  it("expands a job card to reveal its details when clicked, and collapses on second click", async () => {
    const user = userEvent.setup();
    render(<CareersPage />);

    const jobHeaderButton = screen
      .getByRole("heading", { name: /frontend engineer/i })
      .closest("button")!;

    await user.click(jobHeaderButton);

    expect(screen.getByText(/about the role/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /apply now/i }),
    ).toBeInTheDocument();

    await user.click(jobHeaderButton);

    await waitFor(() =>
      expect(screen.queryByText(/about the role/i)).not.toBeInTheDocument(),
    );
  });

  it("opens the apply modal with email/LinkedIn/Indeed options and closes it", async () => {
    const user = userEvent.setup();
    render(<CareersPage />);

    const jobHeaderButton = screen
      .getByRole("heading", { name: /frontend engineer/i })
      .closest("button")!;
    await user.click(jobHeaderButton);

    await user.click(screen.getByRole("button", { name: /apply now/i }));

    const modalHeading = screen.getByRole("heading", {
      name: /apply for frontend engineer/i,
    });
    expect(modalHeading).toBeInTheDocument();

    // Scope queries to the modal dialog itself, since the expanded job card
    // in the background also has LinkedIn/Indeed links with the same names.
    const modal = modalHeading.closest("div.relative")!;
    const within_ = within(modal as HTMLElement);

    const emailLink = within_.getByRole("link", { name: /apply via email/i });
    expect(emailLink).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:careers@evermount.co"),
    );

    const linkedinLink = within_.getByRole("link", {
      name: /apply on linkedin/i,
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/jobs/view/1234567890",
    );

    const indeedLink = within_.getByRole("link", { name: /apply on indeed/i });
    expect(indeedLink).toHaveAttribute(
      "href",
      "https://www.indeed.com/viewjob?jk=abc123def456",
    );

    // Close the modal via the X button.
    const modalCloseButton = within_.getByRole("button", { name: "" });
    await user.click(modalCloseButton);

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", {
          name: /apply for frontend engineer/i,
        }),
      ).not.toBeInTheDocument(),
    );
  });

  it("provides a mailto CTA for candidates without a matching open role", () => {
    render(<CareersPage />);
    const emailCta = screen.getByRole("link", {
      name: /email us: careers@evermount.co/i,
    });
    expect(emailCta).toHaveAttribute("href", "mailto:careers@evermount.co");
  });
});
