import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import ManagerLayout from "./layout";

const replace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace, back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("ManagerLayout", () => {
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

  it("renders children for a MANAGER user", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "m@b.com", fullName: "M B", role: "MANAGER" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "m@b.com",
      fullName: "M B",
      kycStatus: "VERIFIED",
      role: "MANAGER",
    });

    render(
      <ManagerLayout>
        <div>Manager Content</div>
      </ManagerLayout>,
    );

    expect(await screen.findByText("Manager Content")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("renders children for an ADMIN user", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "2", email: "a@b.com", fullName: "A B", role: "ADMIN" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "2",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "VERIFIED",
      role: "ADMIN",
    });

    render(
      <ManagerLayout>
        <div>Manager Content</div>
      </ManagerLayout>,
    );

    expect(await screen.findByText("Manager Content")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("does not render children for an INVESTOR and redirects to /dashboard", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "3", email: "c@d.com", fullName: "C D", role: "INVESTOR" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "3",
      email: "c@d.com",
      fullName: "C D",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
    });

    render(
      <ManagerLayout>
        <div>Manager Content</div>
      </ManagerLayout>,
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/dashboard"));
    expect(screen.queryByText("Manager Content")).not.toBeInTheDocument();
  });

  it("redirects to /login when there is no authenticated user", async () => {
    mock.onGet("/users/profile").reply(200, {});

    render(
      <ManagerLayout>
        <div>Manager Content</div>
      </ManagerLayout>,
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
    expect(screen.queryByText("Manager Content")).not.toBeInTheDocument();
  });
});
