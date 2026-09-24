import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    ".next/**",
    "out/**",
    "dist/**",
    "next-env.d.ts",
    "coverage/**",
    ".vitest/**",
    ".playwright-cli/**",
    "output/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
