import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import Footer from "./Footer";

describe("Footer", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the footer link sections and copyright", () => {
    render(<Footer />);

    expect(screen.getByText("Markets")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Legal & Compliance")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${year} Evermount Capital`)),
    ).toBeInTheDocument();
  });

  it("renders contact details and social links", () => {
    render(<Footer />);

    expect(screen.getByText("info@evermount.co")).toHaveAttribute(
      "href",
      "mailto:info@evermount.co",
    );
    expect(screen.getByText("+254 758 578 816")).toHaveAttribute(
      "href",
      "tel:+254758578816",
    );
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("X Twitter")).toBeInTheDocument();
  });

  it("does not submit the newsletter form when the email is empty", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const button = screen.getByRole("button", { name: "Subscribe" });
    await user.click(button);

    expect(mock.history.post.length).toBe(0);
    expect(screen.queryByText("✓ Subscribed")).not.toBeInTheDocument();
  });

  it("submits the newsletter signup and shows the subscribed state", async () => {
    mock.onPost("/waitlist").reply(200, {});
    const user = userEvent.setup();
    render(<Footer />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "investor@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      expect(screen.getByText("✓ Subscribed")).toBeInTheDocument();
    });

    expect(mock.history.post[0].url).toBe("/waitlist");
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      email: "investor@example.com",
    });
    expect(input).toHaveValue("");
  });

  it("logs an error and keeps the form usable when the newsletter request fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mock.onPost("/waitlist").reply(500);
    const user = userEvent.setup();
    render(<Footer />);

    const input = screen.getByPlaceholderText("you@example.com");
    await user.type(input, "fails@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Newsletter submission error:",
        expect.anything(),
      );
    });

    expect(screen.queryByText("✓ Subscribed")).not.toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
