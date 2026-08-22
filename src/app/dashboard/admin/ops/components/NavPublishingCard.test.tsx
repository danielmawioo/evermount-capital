import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavPublishingCard from "./NavPublishingCard";

describe("NavPublishingCard", () => {
  it("renders the heading, description and triggers the NAV batch on click", async () => {
    const user = userEvent.setup();
    const onRunNavBatch = jest.fn();
    render(
      <NavPublishingCard actionLoading={false} onRunNavBatch={onRunNavBatch} />,
    );

    expect(screen.getByText("NAV Publishing")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pulls strategy NAV from evermount-quant and updates investor portfolio values\./,
      ),
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Run NAV Batch/i });
    expect(button).not.toBeDisabled();
    await user.click(button);
    expect(onRunNavBatch).toHaveBeenCalledTimes(1);
  });

  it("disables the button while an action is loading", () => {
    render(
      <NavPublishingCard actionLoading={true} onRunNavBatch={jest.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: /Run NAV Batch/i }),
    ).toBeDisabled();
  });
});
