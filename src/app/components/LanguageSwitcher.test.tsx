import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider } from "@/context/LocaleContext";
import LanguageSwitcher from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("lists supported languages including Arabic for the UAE and applies a selection", async () => {
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
    expect(
      screen.getByRole("option", { name: "العربية" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Deutsch" }));

    await waitFor(() =>
      expect(localStorage.getItem("evermount-locale")).toBe("de"),
    );
    expect(document.documentElement.lang).toBe("de");
    expect(document.documentElement.dir).toBe("ltr");
    expect(screen.getByLabelText("Sprache")).toBeInTheDocument();
  });

  it("applies Arabic as UAE locale with RTL document direction", async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <LanguageSwitcher />
      </LocaleProvider>,
    );

    await user.click(screen.getByLabelText("Language"));
    await user.click(screen.getByRole("option", { name: "العربية" }));

    await waitFor(() =>
      expect(localStorage.getItem("evermount-locale")).toBe("ar"),
    );
    expect(document.documentElement.lang).toBe("ar-AE");
    expect(document.documentElement.dir).toBe("rtl");
    expect(screen.getByLabelText("اللغة")).toBeInTheDocument();
  });
});
