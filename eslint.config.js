import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

// 토큰 규칙: hex / rgba / primitive 변수 직접 사용 금지 (src/components/CLAUDE.md 참고)
const RAW_COLOR = "/^#[0-9a-fA-F]{3,8}$|rgba?\\(|--ls-(gray|blue|red|teal|orange|green|white|black)/";

export default defineConfig([
  globalIgnores([".next", "dist", "storybook-static"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: `Literal[value=${RAW_COLOR}]`,
          message: "색은 semantic 토큰(Color.* / var(--ls-accent-*) 등)만 쓴다.",
        },
        {
          selector: `TemplateElement[value.raw=${RAW_COLOR}]`,
          message: "색은 semantic 토큰(Color.* / var(--ls-accent-*) 등)만 쓴다.",
        },
      ],
    },
  },
  {
    files: ["src/stories/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["src/components/*", "../components/*"],
              message: "컴포넌트는 src/components barrel에서만 import한다.",
            },
          ],
        },
      ],
    },
  },
]);
