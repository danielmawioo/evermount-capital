import { getApiErrorMessage } from "./api-error";

describe("getApiErrorMessage", () => {
  it("returns the nested error.message when present", () => {
    const error = {
      response: { data: { error: { message: "Nested error message" } } },
    };
    expect(getApiErrorMessage(error, "fallback")).toBe("Nested error message");
  });

  it("returns the top-level data.message when nested error.message is absent", () => {
    const error = {
      response: { data: { message: "Top level message" } },
    };
    expect(getApiErrorMessage(error, "fallback")).toBe("Top level message");
  });

  it("prefers the nested error.message over the top-level message when both are present", () => {
    const error = {
      response: {
        data: { error: { message: "Nested" }, message: "Top level" },
      },
    };
    expect(getApiErrorMessage(error, "fallback")).toBe("Nested");
  });

  it("returns the fallback when neither message is present", () => {
    const error = { response: { data: {} } };
    expect(getApiErrorMessage(error, "fallback")).toBe("fallback");
  });

  it("returns the fallback when response is missing entirely", () => {
    const error = {};
    expect(getApiErrorMessage(error, "fallback")).toBe("fallback");
  });

  it("returns the fallback for a non-object error", () => {
    expect(getApiErrorMessage("just a string", "fallback")).toBe("fallback");
    expect(getApiErrorMessage(null, "fallback")).toBe("fallback");
    expect(getApiErrorMessage(undefined, "fallback")).toBe("fallback");
  });
});
