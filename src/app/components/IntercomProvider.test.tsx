import { render } from "@testing-library/react";
import { boot, shutdown } from "@intercom/messenger-js-sdk";
import IntercomProvider from "./IntercomProvider";

jest.mock("@intercom/messenger-js-sdk", () => ({
  boot: jest.fn(),
  shutdown: jest.fn(),
}));

describe("IntercomProvider", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders nothing and does not boot Intercom when disabled", () => {
    process.env.NEXT_PUBLIC_ENABLE_INTERCOM = "false";
    process.env.NEXT_PUBLIC_INTERCOM_APP_ID = "abc123";

    const { container } = render(<IntercomProvider />);

    expect(container).toBeEmptyDOMElement();
    expect(boot).not.toHaveBeenCalled();
  });

  it("does not boot Intercom when enabled but missing an app id", () => {
    process.env.NEXT_PUBLIC_ENABLE_INTERCOM = "true";
    delete process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

    render(<IntercomProvider />);

    expect(boot).not.toHaveBeenCalled();
  });

  it("boots Intercom with the configured app id when enabled, and shuts down on unmount", () => {
    process.env.NEXT_PUBLIC_ENABLE_INTERCOM = "true";
    process.env.NEXT_PUBLIC_INTERCOM_APP_ID = "abc123";

    const { unmount } = render(<IntercomProvider />);

    expect(boot).toHaveBeenCalledWith({ app_id: "abc123" });

    unmount();

    expect(shutdown).toHaveBeenCalled();
  });
});
