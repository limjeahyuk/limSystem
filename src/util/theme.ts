type ColorType = "RED" | "BLUE" | "GRAY" | "TEAL" | "ORANGE" | "GREEN";

// theme.css semantic 변수의 TS 미러. 인라인 style에서만 참조하고 값은 theme.css에서 바꾼다.
const Color = {
  ACCENT_50: "var(--ls-accent-50)",
  ACCENT_100: "var(--ls-accent-100)",
  ACCENT_200: "var(--ls-accent-200)",
  ACCENT_300: "var(--ls-accent-300)",
  ACCENT_400: "var(--ls-accent-400)",
  ACCENT_500: "var(--ls-accent-500)",
  ACCENT_600: "var(--ls-accent-600)",
  ACCENT_700: "var(--ls-accent-700)",
  ACCENT_800: "var(--ls-accent-800)",
  ACCENT_900: "var(--ls-accent-900)",

  BG_SURFACE: "var(--ls-bg-surface)",
  BG_SUBTLE: "var(--ls-bg-subtle)",
  BG_MUTED: "var(--ls-bg-muted)",
  BG_DISABLED: "var(--ls-bg-disabled)",
  BG_INVERSE: "var(--ls-bg-inverse)",

  BORDER_DEFAULT: "var(--ls-border-default)",
  BORDER_STRONG: "var(--ls-border-strong)",
  BORDER_FOCUS: "var(--ls-border-focus)",

  TEXT_PRIMARY: "var(--ls-text-primary)",
  TEXT_SECONDARY: "var(--ls-text-secondary)",
  TEXT_TERTIARY: "var(--ls-text-tertiary)",
  TEXT_DISABLED: "var(--ls-text-disabled)",
  TEXT_PLACEHOLDER: "var(--ls-text-placeholder)",
  TEXT_INVERSE: "var(--ls-text-inverse)",
} as const;

const Radius = {
  none: "var(--ls-radius-none)",
  small: "var(--ls-radius-small)",
  medium: "var(--ls-radius-medium)",
  large: "var(--ls-radius-large)",
  full: "var(--ls-radius-full)",
} as const;

type RadiusType = keyof typeof Radius;

export { Color, Radius, type ColorType, type RadiusType };
