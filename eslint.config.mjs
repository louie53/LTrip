import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    // Archived Figma execution fragment; its helpers are used by other design snippets.
    "docs/design/figma/helpers.js",
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
