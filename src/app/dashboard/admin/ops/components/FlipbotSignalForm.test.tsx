import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import FlipbotSignalForm, { SignalFormState } from "./FlipbotSignalForm";

function Wrapper({
  initial,
  onSubmit,
  connected,
}: {
  initial: SignalFormState;
  onSubmit: () => void;
  connected: boolean;
}) {
  const [signalForm, setSignalForm] = useState(initial);
  return (
    <FlipbotSignalForm
      flipbot={{ connected }}
      flipbotPool={null}
      signalForm={signalForm}
      setSignalForm={setSignalForm}
      actionLoading={false}
      onSubmit={onSubmit}
    />
  );
}

const DEFAULT_FORM: SignalFormState = {
  strategyKey: "momentum",
  symbol: "EURUSD",
  side: "buy",
  volumeLots: 0.01,
  slPips: 20,
  tpPips: 40,
};

describe("FlipbotSignalForm", () => {
  it("auto-fills the symbol when the strategy changes", async () => {
    const user = userEvent.setup();
    render(
      <Wrapper initial={DEFAULT_FORM} onSubmit={jest.fn()} connected={true} />
    );

    await user.selectOptions(screen.getByLabelText("Strategy"), "mean_reversion");
    expect(screen.getByLabelText("Symbol")).toHaveValue("GBPUSD");
  });

  it("disables the submit button when Flipbot is disconnected", () => {
    render(
      <Wrapper initial={DEFAULT_FORM} onSubmit={jest.fn()} connected={false} />
    );

    expect(
      screen.getByRole("button", { name: /Queue signal on MT5 demo/i })
    ).toBeDisabled();
  });

  it("calls onSubmit when queuing a signal while connected", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<Wrapper initial={DEFAULT_FORM} onSubmit={onSubmit} connected={true} />);

    const button = screen.getByRole("button", { name: /Queue signal on MT5 demo/i });
    expect(button).toBeEnabled();
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
