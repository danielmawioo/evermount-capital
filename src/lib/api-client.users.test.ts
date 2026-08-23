/**
 * @jest-environment node
 *
 * MSW's Node server (`msw/node`) intercepts requests at the Node.js
 * `http`/`https` module level. jsdom's `XMLHttpRequest` (this repo's
 * default `testEnvironment`) doesn't expose the Fetch API globals
 * (`Request`/`Response`) that `msw/node` needs, so this one file opts into
 * the plain Node test environment — which also means axios uses its
 * `http` adapter here instead of the `xhr` adapter, a closer match to how
 * requests actually flow through `msw/node` in production Node contexts.
 */
import { server } from "@/mocks/server";
import { api } from "./api-client";

function makeFile(name: string, content = "file-contents") {
  return new File([content], name, { type: "text/plain" });
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api.users", () => {
  it("getProfile resolves with the mock profile", async () => {
    const response = await api.users.getProfile();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      id: "user-mock-1",
      email: "investor@example.com",
      fullName: "Mock Investor",
      role: "client",
    });
  });

  it("updateProfile resolves with the request body echoed back", async () => {
    const response = await api.users.updateProfile({ fullName: "Updated" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      id: "user-mock-1",
      fullName: "Updated",
    });
  });

  it("changePassword resolves with success", async () => {
    const response = await api.users.changePassword({
      currentPassword: "old",
      newPassword: "new",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("updateEmail resolves with the new email echoed back", async () => {
    const response = await api.users.updateEmail({
      newEmail: "updated@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ email: "updated@example.com" });
  });

  it("uploadProfilePicture resolves with the mock cdn url", async () => {
    const response = await api.users.uploadProfilePicture(
      makeFile("avatar.png"),
    );
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      url: "https://cdn.evermount.co/mock/avatar.png",
    });
  });

  it("deleteAccount resolves with deleted:true", async () => {
    const response = await api.users.deleteAccount({
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ deleted: true });
  });

  it("bankAccounts.list resolves with an empty array fixture", async () => {
    const response = await api.users.bankAccounts.list();
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });

  it("bankAccounts.add resolves with the created bank account echoed back", async () => {
    const response = await api.users.bankAccounts.add({
      bankName: "Test Bank",
      accountHolder: "Investor",
      accountNumber: "0001112223",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "bank-account-mock-1",
      bankName: "Test Bank",
      accountHolder: "Investor",
      accountNumber: "0001112223",
    });
  });

  it("bankAccounts.remove resolves with removed:true", async () => {
    const response = await api.users.bankAccounts.remove("acc-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ removed: true });
  });
});
