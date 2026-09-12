import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotificationSettings from "./NotificationSettings";

describe("NotificationSettings", () => {
  it("renders notification toggles and reports clicks", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(
      <NotificationSettings
        settings={{ email: true, sms: false, push: true }}
        onToggle={onToggle}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Notification Preferences" }),
    ).toBeInTheDocument();
    await user.click(screen.getAllByRole("button")[0]);
    expect(onToggle).toHaveBeenCalledWith("email");
  });
});
