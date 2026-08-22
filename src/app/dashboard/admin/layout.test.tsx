import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import AdminLayout from "./layout";

const replace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace, back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("AdminLayout", () => {
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

  it("renders children for an ADMIN user", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "a@b.com", fullName: "A B", role: "ADMIN" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "VERIFIED",
      role: "ADMIN",
    });

    render(
      <AdminLayout>
        <div>Admin Content</div>
      </AdminLayout>,
    );

    expect(await screen.findByText("Admin Content")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("does not render children for a non-admin role and redirects to /dashboard", async () => {
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
      <AdminLayout>
        <div>Admin Content</div>
      </AdminLayout>,
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/dashboard"));
    expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
  });

  it("redirects to /login when there is no authenticated user", async () => {
    mock.onGet("/users/profile").reply(200, {});

    render(
      <AdminLayout>
        <div>Admin Content</div>
      </AdminLayout>,
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
    expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
  });
});
