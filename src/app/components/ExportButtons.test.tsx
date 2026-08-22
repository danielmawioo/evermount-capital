import { render, screen } from "@testing-library/react";
import ExportButtons from "./ExportButtons";

describe("ExportButtons", () => {
  it("renders the export PDF and export CSV buttons", () => {
    render(<ExportButtons />);

    expect(
      screen.getByRole("button", { name: /Export PDF/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Export CSV/i })
    ).toBeInTheDocument();
  });
});
