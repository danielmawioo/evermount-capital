import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { users } from "./users";

describe("users api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getProfile gets /users/profile", async () => {
    mock.onGet("/users/profile").reply(200, { id: "u1" });
    const res = await users.getProfile();
    expect(res.data).toEqual({ id: "u1" });
    expect(mock.history.get[0].url).toBe("/users/profile");
  });

  it("updateProfile puts data to /users/profile", async () => {
    mock.onPut("/users/profile").reply(200, { fullName: "New Name" });
    const body = { fullName: "New Name" };
    const res = await users.updateProfile(body);
    expect(res.data).toEqual({ fullName: "New Name" });
    const req = mock.history.put[0];
    expect(req.url).toBe("/users/profile");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("changePassword puts current/new password to /users/change-password", async () => {
    mock.onPut("/users/change-password").reply(200, { success: true });
    const body = { currentPassword: "old", newPassword: "new" };
    const res = await users.changePassword(body);
    expect(res.data).toEqual({ success: true });
    const req = mock.history.put[0];
    expect(req.url).toBe("/users/change-password");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("updateEmail puts new email/password to /users/email", async () => {
    mock.onPut("/users/email").reply(200, { email: "new@example.com" });
    const body = { newEmail: "new@example.com", password: "pw" };
    const res = await users.updateEmail(body);
    expect(res.data).toEqual({ email: "new@example.com" });
    const req = mock.history.put[0];
    expect(req.url).toBe("/users/email");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("uploadProfilePicture posts a FormData file with multipart headers", async () => {
    mock
      .onPost("/users/profile-picture")
      .reply(200, { url: "https://example.com/pic.png" });
    const file = new File(["binary-content"], "avatar.png", {
      type: "image/png",
    });
    const res = await users.uploadProfilePicture(file);
    expect(res.data).toEqual({ url: "https://example.com/pic.png" });
    const req = mock.history.post[0];
    expect(req.url).toBe("/users/profile-picture");
    expect(req.data).toBeInstanceOf(FormData);
    expect(req.data.get("file")).toBe(file);
    expect(req.headers?.["Content-Type"]).toBe("multipart/form-data");
  });

  it("deleteAccount deletes /users/account with password in body", async () => {
    mock.onDelete("/users/account").reply(200, { deleted: true });
    const res = await users.deleteAccount({ password: "pw" });
    expect(res.data).toEqual({ deleted: true });
    const req = mock.history.delete[0];
    expect(req.url).toBe("/users/account");
    expect(JSON.parse(req.data)).toEqual({ password: "pw" });
  });

  it("bankAccounts.list gets /users/bank-accounts", async () => {
    mock.onGet("/users/bank-accounts").reply(200, []);
    const res = await users.bankAccounts.list();
    expect(res.data).toEqual([]);
    expect(mock.history.get[0].url).toBe("/users/bank-accounts");
  });

  it("bankAccounts.add posts bank account data to /users/bank-accounts", async () => {
    mock.onPost("/users/bank-accounts").reply(200, { id: "b1" });
    const body = {
      bankName: "Equity",
      accountHolder: "A B",
      accountNumber: "123456",
      routingNumber: "000111",
      isDefault: true,
    };
    const res = await users.bankAccounts.add(body);
    expect(res.data).toEqual({ id: "b1" });
    const req = mock.history.post[0];
    expect(req.url).toBe("/users/bank-accounts");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("bankAccounts.remove deletes /users/bank-accounts/:accountId", async () => {
    mock.onDelete("/users/bank-accounts/b1").reply(200, { removed: true });
    const res = await users.bankAccounts.remove("b1");
    expect(res.data).toEqual({ removed: true });
    expect(mock.history.delete[0].url).toBe("/users/bank-accounts/b1");
  });
});
