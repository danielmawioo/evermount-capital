import { snapshotFromOverlay } from "./gex-public";

describe("snapshotFromOverlay", () => {
  it("maps public overlay analytics and paper risk fields", () => {
    const snapshot = snapshotFromOverlay(
      {
        spot: 4401.2,
        futures: 4405.1,
        basis: 3.9,
        gamma_flip: 4398,
        max_pain: 4400,
        gex: 12.5,
        regime: "NEGATIVE_GAMMA",
        expected_move: 19.2,
        session: "LONDON",
        confidence: 0.42,
        calibration: "PLACEHOLDER_PRIORS",
        mode: "PAPER",
        halt: false,
        risk_budget_usd: 750,
        max_daily_loss_usd: 1500,
        halt_reason: null,
        note: "Live chain",
      },
      true,
    );

    expect(snapshot.live).toBe(true);
    expect(snapshot.regime).toBe("NEGATIVE_GAMMA");
    expect(snapshot.expectedMove).toBe(19.2);
    expect(snapshot.session).toBe("LONDON");
    expect(snapshot.confidence).toBe(0.42);
    expect(snapshot.mode).toBe("PAPER");
    expect(snapshot.halt).toBe(false);
    expect(snapshot.riskBudgetUsd).toBe(750);
    expect(snapshot.maxDailyLossUsd).toBe(1500);
    expect(snapshot.note).toBe("Live chain");
  });

  it("treats MT5 zero gamma_flip as missing", () => {
    const snapshot = snapshotFromOverlay({ gamma_flip: 0, max_pain: 0 }, true);
    expect(snapshot.gammaFlip).toBeNull();
    expect(snapshot.maxPain).toBeNull();
  });
});
