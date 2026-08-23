import { navItems } from "./navItems";

describe("navItems", () => {
  it("is a non-empty array where every item has a label and href", () => {
    expect(navItems.length).toBeGreaterThan(0);

    for (const item of navItems) {
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
      expect(typeof item.href).toBe("string");
      expect(item.href.length).toBeGreaterThan(0);
    }
  });

  it("gives every submenu entry a label, description, href and icon component", () => {
    const itemsWithSubmenu = navItems.filter((item) => item.submenu);
    expect(itemsWithSubmenu.length).toBeGreaterThan(0);

    for (const item of itemsWithSubmenu) {
      for (const subItem of item.submenu ?? []) {
        expect(typeof subItem.label).toBe("string");
        expect(subItem.label.length).toBeGreaterThan(0);
        expect(typeof subItem.description).toBe("string");
        expect(subItem.description.length).toBeGreaterThan(0);
        expect(typeof subItem.href).toBe("string");
        expect(subItem.href.length).toBeGreaterThan(0);
        expect(subItem.icon).toBeDefined();
      }
    }
  });

  it("has unique top-level labels", () => {
    const labels = navItems.map((item) => item.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
