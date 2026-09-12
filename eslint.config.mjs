import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    rules: {
      // Route all logging through src/lib/logger.ts so error reporting
      // (Sentry forwarding) and log shape stay consistent app-wide.
      "no-console": "error",
      // Next 16's eslint-config-next enables React Compiler-oriented hooks
      // rules that flag widespread mount-load and derived-state patterns.
      // Keep the previous lint bar until those call sites are refactored.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "@next/next/no-location-assign-relative-destination": "off",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    rules: {
      "max-lines": ["error", { max: 500 }],
    },
  },
  {
    // logger.ts is the one place allowed to call console directly — it's
    // the abstraction everything else routes through.
    files: ["src/lib/logger.ts"],
    rules: {
      "no-console": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
    "gex-engine/**",
    "jest.config.js",
    "public/mockServiceWorker.js",
  ]),
]);

export default eslintConfig;
