import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add Prettier last to disable conflicting rules
  prettier,

  // Optional: you can add custom rules here
  {
    rules: {
      // Example: enforce single quotes
      quotes: ["error", "single"],
    },
  },
];

export default eslintConfig;
