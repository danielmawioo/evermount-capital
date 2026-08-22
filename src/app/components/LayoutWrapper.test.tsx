import { render, screen } from "@testing-library/react";
import LayoutWrapper from "./LayoutWrapper";

let mockPathname = "/";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(),
}));

// Keep this a smoke-level test: Navbar/Footer/ChatWidget/CookieConsent each
// pull in their own network calls and animation libraries which are already
// covered by their own dedicated test files.
jest.mock("./Navbar", () => {
  function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  }
  return MockNavbar;
});
jest.mock("./Footer", () => {
  function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  }
  return MockFooter;
});
jest.mock("./CookieConsent", () => {
  function MockCookieConsent() {
    return <div data-testid="cookie-consent">CookieConsent</div>;
  }
  return MockCookieConsent;
});
jest.mock("./ChatWidget", () => {
  function MockChatWidget() {
    return <div data-testid="chat-widget">ChatWidget</div>;
  }
  return MockChatWidget;
});

describe("LayoutWrapper", () => {
  afterEach(() => {
    mockPathname = "/";
  });

  it("renders children plus navbar, footer, cookie consent and chat widget on a normal route", () => {
    mockPathname = "/about";
    render(
      <LayoutWrapper>
        <div>Page Content</div>
      </LayoutWrapper>
    );

    expect(screen.getByText("Page Content")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("cookie-consent")).toBeInTheDocument();
    expect(screen.getByTestId("chat-widget")).toBeInTheDocument();
  });

  it("hides the navbar and footer (but keeps chat) on dashboard routes", () => {
    mockPathname = "/dashboard/portfolio";
    render(
      <LayoutWrapper>
        <div>Dashboard Content</div>
      </LayoutWrapper>
    );

    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cookie-consent")).not.toBeInTheDocument();
    expect(screen.getByTestId("chat-widget")).toBeInTheDocument();
  });

  it("hides navbar, footer and chat on auth routes", () => {
    mockPathname = "/login";
    render(
      <LayoutWrapper>
        <div>Login Content</div>
      </LayoutWrapper>
    );

    expect(screen.getByText("Login Content")).toBeInTheDocument();
    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("chat-widget")).not.toBeInTheDocument();
  });

  it("hides the footer but keeps the navbar and chat on the book-demo page", () => {
    mockPathname = "/book-demo";
    render(
      <LayoutWrapper>
        <div>Book Demo Content</div>
      </LayoutWrapper>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cookie-consent")).not.toBeInTheDocument();
    expect(screen.getByTestId("chat-widget")).toBeInTheDocument();
  });
});
