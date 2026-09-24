import { describe, expect, it } from "vitest";
import { GET } from "../../src/app/api/health/route";

describe("public health endpoint", () => {
  it("returns only the public liveness contract, without environment details", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({ data: { status: "ok" } });
  });

  it("prevents a cached result from being treated as a fresh health check", () => {
    expect(GET().headers.get("cache-control")).toBe("no-store");
  });
});
