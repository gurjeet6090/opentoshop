import { Platform } from "react-native";

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Colors = {
  /* BRAND */
  primary: "#ff6b6b",
  secondary: "#64748B",
  accent: "#06B6D4",

  lightBg: "#F8FAFC",
  lightCard: "#FFFFFF",
  lightInput: "#E2E8F0",
  lightText: "#0F172A",
  lightSub: "#64748B",
  lightPlace: "#94A3B8",

  darkBg: "#020617",
  darkCard: "#0F172A",
  darkInput: "#1E293B",
  darkText: "#F8FAFC",
  darkSub: "#CBD5E1",
  darkPlace: "#64748B",

  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  overlayDark: "rgba(0,0,0,0.5)",
  overlayLight: "rgba(255,255,255,0.6)",
};

export function getColors(isDark: boolean) {
  const colors = {
    bg: isDark ? Colors.darkBg : Colors.lightBg,
    card: isDark ? Colors.darkCard : Colors.lightCard,
    input: isDark ? Colors.darkInput : Colors.lightInput,
    text: isDark ? Colors.darkText : Colors.lightText,
    sub: isDark ? Colors.darkSub : Colors.lightSub,
    btn: Colors.primary,
  };
  return colors;
}
