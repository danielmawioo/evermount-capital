import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import Sidebar from "./Sidebar";

let mockPathname = "/dashboard";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(),
}));

describe("Sidebar", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    mockPathname = "/dashboard";
  });

  afterEach(() => {
    mock.restore();
  });

  it("always renders the investor navigation section", async () => {
    mock.onGet("/users/profile").reply(200, {});

    render(<Sidebar />);

    expect(screen.getByText("Investor")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Overview/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: /Wallet/i })).toHaveAttribute(
      "href",
      "/dashboard/wallets",
    );
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(screen.queryByText("Management")).not.toBeInTheDocument();
  });

  it("shows the Admin and Management sections for an ADMIN user", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      {
        id: "1",
        email: "admin@evermount.co",
        fullName: "Admin",
        role: "ADMIN",
      },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "admin@evermount.co",
      fullName: "Admin",
      kycStatus: "VERIFIED",
      role: "ADMIN",
      subscription: { planType: "ENTERPRISE" },
    });

    render(<Sidebar />);

    await waitFor(() => expect(screen.getByText("Admin")).toBeInTheDocument());
    expect(screen.getByText("Management")).toBeInTheDocument();
    expect(screen.getByText("Institutional")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Withdrawals/i })).toHaveAttribute(
      "href",
      "/dashboard/admin/withdrawals",
    );
  });

  it("shows only the Management section (not Admin) for a MANAGER user", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      {
        id: "2",
        email: "manager@evermount.co",
        fullName: "Manager",
        role: "MANAGER",
      },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "2",
      email: "manager@evermount.co",
      fullName: "Manager",
      kycStatus: "VERIFIED",
      role: "MANAGER",
    });

    render(<Sidebar />);

    await waitFor(() =>
      expect(screen.getByText("Management")).toBeInTheDocument(),
    );
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /My Clients/i })).toHaveAttribute(
      "href",
      "/dashboard/manager/clients",
    );
  });

  it("does not show Admin/Management for a plain INVESTOR user", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      {
        id: "3",
        email: "investor@evermount.co",
        fullName: "Investor",
        role: "INVESTOR",
      },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "3",
      email: "investor@evermount.co",
      fullName: "Investor",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
    });

    render(<Sidebar />);

    await waitFor(() =>
      expect(screen.getByText("Your plan")).toBeInTheDocument(),
    );
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(screen.queryByText("Management")).not.toBeInTheDocument();
  });

  it("highlights the active link based on the current pathname", async () => {
    mockPathname = "/dashboard/wallets";
    mock.onGet("/users/profile").reply(200, {});

    render(<Sidebar />);

    const walletLink = screen.getByRole("link", { name: /Wallet/i });
    expect(walletLink.className).toContain("bg-[#00a76f]");

    const overviewLink = screen.getByRole("link", { name: /Overview/i });
    expect(overviewLink.className).not.toContain("bg-[#00a76f]");
  });

  it("calls onClose when the mobile close button or a nav link is clicked", async () => {
    const onClose = jest.fn();
    mock.onGet("/users/profile").reply(200, {});
    const user = userEvent.setup();

    render(<Sidebar onClose={onClose} />);

    await user.click(screen.getByRole("link", { name: /Overview/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
