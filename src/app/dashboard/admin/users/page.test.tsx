import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import UserManagementPage from "./page";

const baseUsers = [
  {
    id: "u1",
    email: "investor@evermount.co",
    fullName: "Investor One",
    role: "INVESTOR",
    status: "active",
    kycStatus: "VERIFIED",
    createdAt: new Date().toISOString(),
    totalDeposits: 1000,
  },
  {
    id: "u2",
    email: "suspended@evermount.co",
    fullName: "Suspended Two",
    role: "INVESTOR",
    status: "inactive",
    kycStatus: "PENDING",
    createdAt: new Date().toISOString(),
    totalDeposits: 0,
  },
];

function fieldFor(labelText: RegExp): HTMLInputElement {
  const label = screen.getByText(labelText);
  const input = label.parentElement?.querySelector("input");
  if (!input) throw new Error(`No input found for label ${labelText}`);
  return input as HTMLInputElement;
}

describe("UserManagementPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    jest.spyOn(toast, "success").mockImplementation(() => "");
    jest.spyOn(toast, "error").mockImplementation(() => "");
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    mock.restore();
    jest.restoreAllMocks();
  });

  it("renders the loaded users list", async () => {
    mock
      .onGet("/admin/users")
      .reply(200, { users: baseUsers, total: baseUsers.length });

    render(<UserManagementPage />);

    expect(await screen.findByText("Investor One")).toBeInTheDocument();
    expect(screen.getByText("Suspended Two")).toBeInTheDocument();
  });

  it("shows an error toast when loading users fails", async () => {
    mock.onGet("/admin/users").reply(500);

    render(<UserManagementPage />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to load users")
    );
  });

  it("creates a user via the Add User modal", async () => {
    const user = userEvent.setup();
    mock
      .onGet("/admin/users")
      .reply(200, { users: baseUsers, total: baseUsers.length });
    mock.onPost("/admin/users").reply(201, {});

    render(<UserManagementPage />);
    await screen.findByText("Investor One");

    await user.click(screen.getByRole("button", { name: /add user/i }));

    await user.type(fieldFor(/full name/i), "New Person");
    await user.type(fieldFor(/^email$/i), "new@evermount.co");
    await user.type(fieldFor(/temporary password/i), "secret123");

    await user.click(screen.getByRole("button", { name: /create user/i }));

    await waitFor(() =>
      expect(mock.history.post.filter((r) => r.url === "/admin/users")).toHaveLength(
        1
      )
    );
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/users")!.data
    );
    expect(payload).toEqual({
      fullName: "New Person",
      email: "new@evermount.co",
      password: "secret123",
      role: "INVESTOR",
    });
    expect(toast.success).toHaveBeenCalledWith("User created");
  });

  it("suspends an active user", async () => {
    const user = userEvent.setup();
    mock
      .onGet("/admin/users")
      .reply(200, { users: baseUsers, total: baseUsers.length });
    mock.onPost("/admin/users/u1/suspend").reply(200, {});

    render(<UserManagementPage />);
    await screen.findByText("Investor One");

    await user.click(screen.getAllByRole("button", { name: /suspend/i })[0]);

    await waitFor(() =>
      expect(
        mock.history.post.filter((r) => r.url === "/admin/users/u1/suspend")
      ).toHaveLength(1)
    );
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/users/u1/suspend")!.data
    );
    expect(payload).toEqual({ action: "suspend" });
  });

  it("assigns an investor to a manager", async () => {
    const user = userEvent.setup();
    mock
      .onGet("/admin/users")
      .reply(200, { users: baseUsers, total: baseUsers.length });
    mock.onGet("/admin/managers").reply(200, {
      managers: [
        {
          id: "m1",
          fullName: "Manager One",
          email: "manager1@evermount.co",
          status: "active",
          clientCount: 0,
          joinDate: new Date().toISOString(),
        },
        {
          id: "m2",
          fullName: "Inactive Manager",
          email: "manager2@evermount.co",
          status: "inactive",
          clientCount: 0,
          joinDate: new Date().toISOString(),
        },
      ],
    });
    mock.onPost("/admin/managers/m1/clients").reply(200, {});

    render(<UserManagementPage />);
    await screen.findByText("Investor One");

    await user.click(screen.getAllByRole("button", { name: /assign/i })[0]);

    const dialog = (await screen.findByText("Assign to manager")).closest(
      "div"
    ) as HTMLElement;
    await waitFor(() =>
      expect(within(dialog).getByText(/Manager One/)).toBeInTheDocument()
    );
    expect(within(dialog).queryByText(/Inactive Manager/)).not.toBeInTheDocument();

    const select = within(dialog).getByRole("combobox");
    await user.selectOptions(select, "m1");
    await user.click(within(dialog).getByRole("button", { name: /^assign$/i }));

    await waitFor(() =>
      expect(
        mock.history.post.filter((r) => r.url === "/admin/managers/m1/clients")
      ).toHaveLength(1)
    );
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/managers/m1/clients")!
        .data
    );
    expect(payload).toEqual({ email: "investor@evermount.co" });
  });

  it("rejects an invalid credit amount without calling the API", async () => {
    const user = userEvent.setup();
    mock
      .onGet("/admin/users")
      .reply(200, { users: baseUsers, total: baseUsers.length });

    render(<UserManagementPage />);
    await screen.findByText("Investor One");

    await user.click(screen.getAllByRole("button", { name: /credit/i })[0]);

    const dialog = (await screen.findByText("Credit wallet")).closest(
      "div"
    ) as HTMLElement;
    const amountInput = within(dialog).getByPlaceholderText(/amount/i);
    // Use a value that clears the input's native min=1 constraint but still
    // fails the app-level CreditAmountSchema (.finite()), and submit the
    // form directly so jsdom's HTML5 constraint validation (which would
    // otherwise silently swallow a negative-value submit via the button)
    // doesn't mask the app's own validation path.
    fireEvent.change(amountInput, { target: { value: "1e999" } });
    fireEvent.submit(dialog.querySelector("form") as HTMLFormElement);

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(
      mock.history.post.filter((r) => r.url?.includes("/credit"))
    ).toHaveLength(0);
  });

  it("credits a wallet with a valid amount", async () => {
    const user = userEvent.setup();
    mock
      .onGet("/admin/users")
      .reply(200, { users: baseUsers, total: baseUsers.length });
    mock.onPost("/admin/wallets/users/u1/credit").reply(200, {});

    render(<UserManagementPage />);
    await screen.findByText("Investor One");

    await user.click(screen.getAllByRole("button", { name: /credit/i })[0]);

    const dialog = (await screen.findByText("Credit wallet")).closest(
      "div"
    ) as HTMLElement;
    const amountInput = within(dialog).getByPlaceholderText(/amount/i);
    fireEvent.change(amountInput, { target: { value: "250" } });
    await user.click(within(dialog).getByRole("button", { name: /^credit$/i }));

    await waitFor(() =>
      expect(
        mock.history.post.filter(
          (r) => r.url === "/admin/wallets/users/u1/credit"
        )
      ).toHaveLength(1)
    );
    const payload = JSON.parse(
      mock.history.post.find(
        (r) => r.url === "/admin/wallets/users/u1/credit"
      )!.data
    );
    expect(payload).toEqual({
      amount: 250,
      description: "Admin credit for Investor One",
    });
    expect(toast.success).toHaveBeenCalledWith("Credited $250");
  });
});
