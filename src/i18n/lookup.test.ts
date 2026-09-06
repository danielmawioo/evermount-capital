import { buildEnglishIndex, lookupTranslation, normalizeCopy } from "./lookup";
import { messages } from "./messages";

describe("copy lookup", () => {
  const index = buildEnglishIndex(messages.en);

  it("normalizes whitespace before matching", () => {
    expect(normalizeCopy("  Market   Data  ")).toBe("Market Data");
  });

  it("translates known English UI copy into German and Dutch", () => {
    expect(
      lookupTranslation(
        messages,
        index,
        "de",
        "The Infrastructure Behind Modern Markets",
      ),
    ).toBe("Die Infrastruktur hinter modernen Märkten");
    expect(lookupTranslation(messages, index, "nl", "Coming soon")).toBe(
      "Binnenkort",
    );
  });
});
