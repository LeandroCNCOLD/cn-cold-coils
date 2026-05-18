import { describe, it, expect } from "vitest";
import { runBatchValidation } from "../batchValidationService";

describe("runBatchValidation", () => {
  it("roda nos primeiros 5 modelos sem crash", async () => {
    const report = await runBatchValidation();
    expect(report.total).toBeGreaterThan(0);
    expect(report.results.length).toBe(report.total);
    expect(["PASS", "WARN", "FAIL", "SKIP"]).toContain(report.results[0]!.status);
  });

  it("report totals são consistentes", async () => {
    const report = await runBatchValidation();
    const sum = report.passed + report.warned + report.failed + report.skipped;
    expect(sum).toBe(report.total);
  });

  it("SKIP rows têm q_engine_w == 0", async () => {
    const report = await runBatchValidation();
    const skipped = report.results.filter((r) => r.status === "SKIP");
    for (const r of skipped) {
      expect(r.q_engine_w).toBe(0);
    }
  });

  it("non-SKIP rows têm q_catalog_w > 0 e q_engine_w > 0", async () => {
    const report = await runBatchValidation();
    const active = report.results.filter((r) => r.status !== "SKIP");
    for (const r of active) {
      expect(r.q_catalog_w).toBeGreaterThan(0);
      expect(r.q_engine_w).toBeGreaterThan(0);
    }
  });
});
