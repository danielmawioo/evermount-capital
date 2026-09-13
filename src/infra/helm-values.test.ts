import { readFileSync } from "node:fs";
import { join } from "node:path";

const chartDir = join(process.cwd(), "helm/evermount-capital");

function read(name: string) {
  return readFileSync(join(chartDir, name), "utf8");
}

describe("helm chart values", () => {
  it("production values expose health and ready probes", () => {
    const values = read("values.yaml");
    expect(values).toContain("path: /api/health");
    expect(values).toContain("path: /api/ready");
    expect(values).toContain("targetPort: 3000");
  });

  it("CI fixture enables ingress, HPA, PDB, and network policy", () => {
    const ci = read("values-ci.yaml");
    expect(ci).toMatch(/tag:\s*test/);
    expect(ci).toMatch(/ingress:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/autoscaling:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/podDisruptionBudget:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/networkPolicy:[\s\S]*enabled:\s*true/);
  });
});
