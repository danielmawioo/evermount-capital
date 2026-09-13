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

  it("CI fixture enables ingress, HPA, PDB, network policy, TLS, and metrics", () => {
    const ci = read("values-ci.yaml");
    expect(ci).toMatch(/tag:\s*test/);
    expect(ci).toMatch(/digest:\s*"sha256:/);
    expect(ci).toMatch(/ingress:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/secretName:\s*evermount-tls/);
    expect(ci).toMatch(/autoscaling:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/podDisruptionBudget:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/networkPolicy:[\s\S]*enabled:\s*true/);
    expect(ci).toMatch(/serviceMonitor:[\s\S]*enabled:\s*true/);
  });

  it("hardens the pod and allows an image digest override", () => {
    const values = read("values.yaml");
    expect(values).toContain("readOnlyRootFilesystem: true");
    expect(values).toContain("runAsNonRoot: true");
    expect(values).toContain("automount: false");
    expect(values).toContain("digest:");
    expect(values).toContain("path: /api/metrics");
  });
});
