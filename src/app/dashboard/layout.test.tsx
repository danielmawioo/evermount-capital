import { render, screen } from "@testing-library/react";
import DashboardLayout from "./layout";

// Sidebar/Topbar pull in useInvestor, ThemeContext, and API calls of their
// own; they're not the subject of this test, so stub them and verify the
// layout renders its children in the main content area.
jest.mock("@/app/components/Sidebar", () => {
  return function MockSidebar() {
    return <div>Mock Sidebar</div>;
  };
});
jest.mock("@/app/components/Topbar", () => {
  return function MockTopbar() {
    return <div>Mock Topbar</div>;
  };
});

describe("DashboardLayout", () => {
  it("renders the sidebar, topbar, and page children", () => {
    render(
      <DashboardLayout>
        <div>Page Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText("Mock Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Mock Topbar")).toBeInTheDocument();
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});
