import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import RoleGate from "./RoleGate";

const replace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace, back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("RoleGate", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    replace.mockClear();
  });

  afterEach(() => {
    mock.restore();
    localStorage.clear();
    sessionStorage.clear();
  });

  it("renders children when the profile role is in the allowed list", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "a@b.com", fullName: "A B", role: "MANAGER" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "VERIFIED",
      role: "MANAGER",
    });

    render(
      <RoleGate allowed={["MANAGER", "ADMIN"]}>
        <div>Protected Content</div>
      </RoleGate>,
    );

    expect(await screen.findByText("Protected Content")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("does not render children and redirects to /dashboard when the role is not allowed", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "2", email: "c@d.com", fullName: "C D", role: "INVESTOR" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "2",
      email: "c@d.com",
      fullName: "C D",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
    });

    render(
      <RoleGate allowed={["ADMIN"]}>
        <div>Protected Content</div>
      </RoleGate>,
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/dashboard"));
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to /login when there is no authenticated user", async () => {
    mock.onGet("/users/profile").reply(200, {});

    render(
      <RoleGate allowed={["ADMIN"]}>
        <div>Protected Content</div>
      </RoleGate>,
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
