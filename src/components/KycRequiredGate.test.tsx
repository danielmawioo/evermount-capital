import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import KycRequiredGate from "./KycRequiredGate";

describe("KycRequiredGate", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    mock.restore();
    localStorage.clear();
    sessionStorage.clear();
  });

  it("renders children when KYC is verified", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "a@b.com", fullName: "A B", role: "INVESTOR" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
    });

    render(
      <KycRequiredGate>
        <div>Gated Content</div>
      </KycRequiredGate>,
    );

    expect(await screen.findByText("Gated Content")).toBeInTheDocument();
  });

  it("shows the verification-required message and link when KYC is not verified", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "2", email: "c@d.com", fullName: "C D", role: "INVESTOR" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "2",
      email: "c@d.com",
      fullName: "C D",
      kycStatus: "PENDING",
      role: "INVESTOR",
    });

    render(
      <KycRequiredGate action="withdraw funds">
        <div>Gated Content</div>
      </KycRequiredGate>,
    );

    expect(
      await screen.findByText("Verification Required"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Complete KYC verification before you can withdraw funds\./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Complete Verification" }),
    ).toHaveAttribute("href", "/dashboard/kyc");
    expect(screen.queryByText("Gated Content")).not.toBeInTheDocument();
  });

  it("shows the verification-required message when there is no authenticated user", async () => {
    mock.onGet("/users/profile").reply(200, {});

    render(
      <KycRequiredGate>
        <div>Gated Content</div>
      </KycRequiredGate>,
    );

    expect(
      await screen.findByText("Verification Required"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Gated Content")).not.toBeInTheDocument();
  });
});
