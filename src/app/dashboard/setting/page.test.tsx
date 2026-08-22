import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import SettingsPage from "./page";

describe("SettingsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    mock.onGet("/users/profile").reply(200, {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "0700000000",
    });
    mock.onGet("/investments/preferences").reply(200, {
      lockInMonths: 12,
      riskTolerance: "HIGH",
      reinvestProfits: false,
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads and displays the investor's profile and preferences", async () => {
    render(<SettingsPage />);

    expect(
      await screen.findByRole("heading", { name: "Account Settings" })
    ).toBeInTheDocument();
    expect(await screen.findByDisplayValue("Jane Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("jane@example.com")).toBeDisabled();
  });

  it("saves updated profile information", async () => {
    mock.onPut("/users/profile").reply(200, {});
    const user = userEvent.setup();
    render(<SettingsPage />);

    const nameInput = await screen.findByDisplayValue("Jane Doe");
    await user.clear(nameInput);
    await user.type(nameInput, "Janet Doe");

    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => {
      expect(mock.history.put.some((r) => r.url === "/users/profile")).toBe(
        true
      );
    });
    const call = mock.history.put.find((r) => r.url === "/users/profile");
    expect(JSON.parse(call!.data).fullName).toBe("Janet Doe");
  });

  it("saves investment preferences", async () => {
    mock.onPut("/investments/preferences").reply(200, {});
    const user = userEvent.setup();
    render(<SettingsPage />);

    await screen.findByText("Investment Preferences");
    await user.click(screen.getByRole("button", { name: "12 months" }));
    await user.click(
      screen.getByRole("button", { name: "Save Investment Preferences" })
    );

    await waitFor(() => {
      expect(
        mock.history.put.some((r) => r.url === "/investments/preferences")
      ).toBe(true);
    });
  });

  it("rejects a password change when confirmation does not match", async () => {
    const user = userEvent.setup();
    const { container } = render(<SettingsPage />);

    await screen.findByRole("heading", { name: "Change Password" });

    const passwordInputs = container.querySelectorAll<HTMLInputElement>(
      'input[type="password"]'
    );
    expect(passwordInputs).toHaveLength(3);
    const [, newPw, confirmPw] = Array.from(passwordInputs);
    await user.type(newPw, "password1");
    await user.type(confirmPw, "password2");
    await user.click(screen.getByRole("button", { name: "Change Password" }));

    expect(
      mock.history.put.filter((r) => r.url === "/users/change-password")
    ).toHaveLength(0);
  });
});
