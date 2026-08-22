import { extractLinks, getChatFallbackResponse } from "./chat-fallback";

describe("extractLinks", () => {
  it("extracts a single http(s) link from text", () => {
    const text = "Visit https://www.evermount.co/pricing for details.";
    expect(extractLinks(text)).toEqual(["https://www.evermount.co/pricing"]);
  });

  it("extracts multiple links from text", () => {
    const text =
      "See https://www.evermount.co/features and https://www.evermount.co/platform for more.";
    expect(extractLinks(text)).toEqual([
      "https://www.evermount.co/features",
      "https://www.evermount.co/platform",
    ]);
  });

  it("returns an empty array when there are no links", () => {
    expect(extractLinks("There are no links in this message.")).toEqual([]);
  });
});

describe("getChatFallbackResponse", () => {
  it("returns a generic message for an unknown department id", () => {
    const response = getChatFallbackResponse(
      "not-a-department",
      "Sam",
      "hello",
    );
    expect(response).toBe(
      "I'm Sam. Please contact support@evermount.co for assistance.",
    );
  });

  it("returns a keyword-matched answer when the message matches a fallback entry", () => {
    const response = getChatFallbackResponse(
      "payments",
      "Miguel",
      "How do I deposit funds into my account?",
    );
    expect(response).toContain("Miguel");
    expect(response).toContain("Payments & Billing");
    expect(response).toContain("/dashboard/deposit");
    expect(response).toContain("payments@evermount.co");
  });

  it("returns the suggested-prompts response when no keyword matches", () => {
    const response = getChatFallbackResponse(
      "trading",
      "Alex",
      "asdkjhasdkjh unrelated gibberish",
    );
    expect(response).toContain("Alex");
    expect(response).toContain("Trading & Portfolio");
    expect(response).toContain("Common questions I can help with");
  });
});
