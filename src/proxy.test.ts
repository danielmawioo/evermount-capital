/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

function makeRequest(path: string, token?: string): NextRequest {
  const request = new NextRequest(new URL(path, "https://app.evermount.co"));
  if (token) {
    request.cookies.set("evermount_token", token);
  }
  return request;
}

describe("proxy", () => {
  it("redirects to /login with a 'from' query param when there is no auth cookie", () => {
    const request = makeRequest("/dashboard/portfolio");

    const response = proxy(request);

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get("location") as string);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("from")).toBe("/dashboard/portfolio");
  });

  it("allows the request through when the auth cookie is present", () => {
    const request = makeRequest("/dashboard/portfolio", "valid-token");

    const response = proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
