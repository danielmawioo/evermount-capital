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
import AdminManagersPage from "./page";

function fieldFor(
  labelText: RegExp,
  root: ParentNode = document,
): HTMLInputElement {
  const label = within(root as HTMLElement).getByText(labelText);
  const input = label.parentElement?.querySelector("input");
  if (!input) throw new Error(`No input found for label ${labelText}`);
  return input as HTMLInputElement;
}

const baseManagers = [
  {
    id: "m1",
    email: "manager1@evermount.co",
    fullName: "Manager One",
    status: "active" as const,
    clientCount: 2,
    joinDate: new Date().toISOString(),
  },
  {
    id: "m2",
    email: "manager2@evermount.co",
    fullName: "Inactive Manager",
    status: "inactive" as const,
    clientCount: 0,
    joinDate: new Date().toISOString(),
  },
];

const baseClients = [
  {
    assignmentId: "a1",
    clientId: "c1",
    email: "client1@evermount.co",
    fullName: "Client One",
    kycStatus: "VERIFIED",
    availableBalance: 500,
    currency: "USD",
    assignedAt: new Date().toISOString(),
  },
];

describe("AdminManagersPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    jest.spyOn(toast, "success").mockImplementation(() => "");
    jest.spyOn(toast, "error").mockImplementation(() => "");
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    mock.restore();
    jest.restoreAllMocks();
  });

  it("renders the loaded managers list", async () => {
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });

    render(<AdminManagersPage />);

    expect(await screen.findByText("Manager One")).toBeInTheDocument();
    expect(screen.getByText("Inactive Manager")).toBeInTheDocument();
  });

  it("filters managers client-side via the search box", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    await user.type(
      screen.getByPlaceholderText(/search managers/i),
      "Inactive",
    );

    expect(screen.queryByText("Manager One")).not.toBeInTheDocument();
    expect(screen.getByText("Inactive Manager")).toBeInTheDocument();
    expect(
      mock.history.get.filter((r) => r.url === "/admin/managers"),
    ).toHaveLength(1);
  });

  it("rejects a short password on create without calling the API", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    await user.click(screen.getByRole("button", { name: /add manager/i }));

    const dialog = (await screen.findByText("Add Portfolio Manager")).closest(
      ".rounded-xl",
    ) as HTMLElement;
    await user.type(fieldFor(/full name/i, dialog), "New Manager");
    await user.type(fieldFor(/^email$/i, dialog), "newmanager@evermount.co");
    await user.type(fieldFor(/temporary password/i, dialog), "short");

    await user.click(
      within(dialog).getByRole("button", { name: /add manager/i }),
    );

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Password must be at least 8 characters",
      ),
    );
    expect(
      mock.history.post.filter((r) => r.url === "/admin/managers"),
    ).toHaveLength(0);
  });

  it("creates a manager with a valid password", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onPost("/admin/managers").reply(201, {});

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    await user.click(screen.getByRole("button", { name: /add manager/i }));

    const dialog = (await screen.findByText("Add Portfolio Manager")).closest(
      ".rounded-xl",
    ) as HTMLElement;
    await user.type(fieldFor(/full name/i, dialog), "New Manager");
    await user.type(fieldFor(/^email$/i, dialog), "newmanager@evermount.co");
    await user.type(fieldFor(/temporary password/i, dialog), "longenough123");

    await user.click(
      within(dialog).getByRole("button", { name: /add manager/i }),
    );

    await waitFor(() =>
      expect(
        mock.history.post.filter((r) => r.url === "/admin/managers"),
      ).toHaveLength(1),
    );
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/managers")!.data,
    );
    expect(payload).toEqual({
      fullName: "New Manager",
      email: "newmanager@evermount.co",
      password: "longenough123",
    });
    expect(toast.success).toHaveBeenCalledWith("Portfolio manager created");
  });

  it("toggles manager status from active to inactive", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onPut("/admin/managers/m1").reply(200, {});

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /active/i }),
    );

    await waitFor(() =>
      expect(
        mock.history.put.filter((r) => r.url === "/admin/managers/m1"),
      ).toHaveLength(1),
    );
    const payload = JSON.parse(
      mock.history.put.find((r) => r.url === "/admin/managers/m1")!.data,
    );
    expect(payload).toEqual({ status: "inactive" });
  });

  it("toggles manager status from inactive to active", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onPut("/admin/managers/m2").reply(200, {});

    render(<AdminManagersPage />);
    await screen.findByText("Inactive Manager");

    const managerCard = screen
      .getByText("Inactive Manager")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /inactive/i }),
    );

    await waitFor(() =>
      expect(
        mock.history.put.filter((r) => r.url === "/admin/managers/m2"),
      ).toHaveLength(1),
    );
    const payload = JSON.parse(
      mock.history.put.find((r) => r.url === "/admin/managers/m2")!.data,
    );
    expect(payload).toEqual({ status: "active" });
  });

  it("opens the Clients modal and loads that manager's clients", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: baseClients,
    });

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /clients/i }),
    );

    expect(await screen.findByText("Client One")).toBeInTheDocument();
    expect(
      mock.history.get.filter((r) => r.url === "/admin/managers/m1/clients"),
    ).toHaveLength(1);
  });

  it("assigns a client by email inside the Clients modal", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock
      .onGet("/admin/managers/m1/clients")
      .reply(200, { managerId: "m1", managerName: "Manager One", clients: [] });
    mock.onPost("/admin/managers/m1/clients").reply(200, {});

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /clients/i }),
    );

    const emailInput = await screen.findByPlaceholderText(
      /assign investor by email/i,
    );
    await user.type(emailInput, "investor@evermount.co");

    // Re-mock the clients GET so the post-assign refresh reflects the new client.
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: baseClients,
    });

    await user.click(screen.getByRole("button", { name: /^assign$/i }));

    await waitFor(() =>
      expect(
        mock.history.post.filter((r) => r.url === "/admin/managers/m1/clients"),
      ).toHaveLength(1),
    );
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/managers/m1/clients")!
        .data,
    );
    expect(payload).toEqual({ email: "investor@evermount.co" });
    expect(toast.success).toHaveBeenCalledWith("Client assigned");
  });

  it("unassigns a client after confirming", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: baseClients,
    });
    mock.onDelete("/admin/managers/m1/clients/c1").reply(200, {});

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /clients/i }),
    );

    await screen.findByText("Client One");
    await user.click(screen.getByRole("button", { name: /unassign/i }));

    expect(window.confirm).toHaveBeenCalled();
    await waitFor(() =>
      expect(
        mock.history.delete.filter(
          (r) => r.url === "/admin/managers/m1/clients/c1",
        ),
      ).toHaveLength(1),
    );
    expect(toast.success).toHaveBeenCalledWith("Client unassigned");
  });

  it("does not unassign a client when confirmation is declined", async () => {
    const user = userEvent.setup();
    window.confirm = jest.fn(() => false);
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: baseClients,
    });

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /clients/i }),
    );

    await screen.findByText("Client One");
    await user.click(screen.getByRole("button", { name: /unassign/i }));

    expect(window.confirm).toHaveBeenCalled();
    expect(
      mock.history.delete.filter((r) => r.url?.includes("/clients/c1")),
    ).toHaveLength(0);
  });

  it("rejects an invalid credit amount for a client without calling the API", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: baseClients,
    });

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /clients/i }),
    );

    await screen.findByText("Client One");
    await user.click(screen.getByRole("button", { name: /credit wallet/i }));

    const dialog = (
      await screen.findByRole("heading", { name: "Credit wallet" })
    ).closest("div") as HTMLElement;
    const amountInput = within(dialog).getByPlaceholderText(/amount/i);
    fireEvent.change(amountInput, { target: { value: "1e999" } });
    fireEvent.submit(dialog.querySelector("form") as HTMLFormElement);

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(
      mock.history.post.filter((r) => r.url?.includes("/credit")),
    ).toHaveLength(0);
  });

  it("credits a client's wallet with a valid amount", async () => {
    const user = userEvent.setup();
    mock.onGet("/admin/managers").reply(200, { managers: baseManagers });
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: baseClients,
    });
    mock.onPost("/admin/wallets/users/c1/credit").reply(200, {});

    render(<AdminManagersPage />);
    await screen.findByText("Manager One");

    const managerCard = screen
      .getByText("Manager One")
      .closest(".rounded-xl") as HTMLElement;
    await user.click(
      within(managerCard).getByRole("button", { name: /clients/i }),
    );

    await screen.findByText("Client One");
    await user.click(screen.getByRole("button", { name: /credit wallet/i }));

    const dialog = (
      await screen.findByRole("heading", { name: "Credit wallet" })
    ).closest("div") as HTMLElement;
    const amountInput = within(dialog).getByPlaceholderText(/amount/i);
    fireEvent.change(amountInput, { target: { value: "100" } });
    await user.click(within(dialog).getByRole("button", { name: /^credit$/i }));

    await waitFor(() =>
      expect(
        mock.history.post.filter(
          (r) => r.url === "/admin/wallets/users/c1/credit",
        ),
      ).toHaveLength(1),
    );
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/wallets/users/c1/credit")!
        .data,
    );
    expect(payload).toEqual({
      amount: 100,
      description: "Admin credit for Client One",
    });
    expect(toast.success).toHaveBeenCalledWith("Credited $100");
  });

  it("shows an error toast when loading managers fails", async () => {
    mock.onGet("/admin/managers").reply(500);

    render(<AdminManagersPage />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to load portfolio managers",
      ),
    );
  });
});
