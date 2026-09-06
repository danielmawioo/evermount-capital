import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider } from "@/context/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("lists English, French, Spanish, German and Dutch and applies a selection", async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <LanguageSwitcher />
      </LocaleProvider>,
    );

    await user.click(screen.getByLabelText("Language"));

    expect(screen.getByRole("option", { name: "English" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Français" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Español" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Deutsch" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Nederlands" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Deutsch" }));

    await waitFor(() =>
      expect(localStorage.getItem("evermount-locale")).toBe("de"),
    );
    expect(document.documentElement.lang).toBe("de");
    expect(screen.getByLabelText("Sprache")).toBeInTheDocument();
  });
});
