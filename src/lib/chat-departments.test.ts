import {
  CHAT_DEPARTMENTS,
  CHAT_DEPARTMENT_MAP,
  DEFAULT_CHAT_ASSISTANT,
  isValidDepartmentId,
  getDepartmentAssistant,
} from "./chat-departments";

describe("CHAT_DEPARTMENT_MAP", () => {
  it("contains an entry for every department in CHAT_DEPARTMENTS, keyed by id", () => {
    expect(Object.keys(CHAT_DEPARTMENT_MAP)).toHaveLength(
      CHAT_DEPARTMENTS.length,
    );
    for (const dept of CHAT_DEPARTMENTS) {
      expect(CHAT_DEPARTMENT_MAP[dept.id]).toEqual(dept);
    }
  });

  it("includes the expected department ids", () => {
    expect(Object.keys(CHAT_DEPARTMENT_MAP)).toEqual(
      expect.arrayContaining([
        "technical",
        "it-support",
        "payments",
        "compliance",
        "trading",
        "account",
        "general",
      ]),
    );
  });
});

describe("isValidDepartmentId", () => {
  it("returns true for a known department id", () => {
    expect(isValidDepartmentId("payments")).toBe(true);
  });

  it("returns false for an unknown department id", () => {
    expect(isValidDepartmentId("not-a-department")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isValidDepartmentId("")).toBe(false);
  });
});

describe("getDepartmentAssistant", () => {
  it("returns the assistant name for a valid department id", () => {
    expect(getDepartmentAssistant("payments")).toBe("Miguel");
    expect(getDepartmentAssistant("technical")).toBe("Ethan");
  });

  it("returns the default assistant when departmentId is undefined", () => {
    expect(getDepartmentAssistant(undefined)).toBe(DEFAULT_CHAT_ASSISTANT);
  });

  it("returns the default assistant for an unknown department id", () => {
    expect(getDepartmentAssistant("not-a-department")).toBe(
      DEFAULT_CHAT_ASSISTANT,
    );
  });
});
