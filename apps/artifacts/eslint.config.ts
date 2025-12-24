import baseConfig from "@hexium310/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...baseConfig,
  {
    ignores: [
      "worker-configuration.d.ts",
    ],
  }
);
