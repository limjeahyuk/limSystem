import { IconName } from "../Icon/icon-data";
import { Color, Radius } from "util/theme";
import Badge from "./Badge";
import { Icon } from "../Icon/Icon";
import { Text } from "../text";

type BadgeVariant = "solid" | "surface" | "outline";
type BadgeColor = "RED" | "BLUE" | "GRAY" | "TEAL" | "ORANGE" | "GREEN";
type BadgeSize = "1" | "2" | "3";

interface BadgeProps {
  label: string;
  size?: BadgeSize;
  variant: BadgeVariant;
  startIcon?: IconName;
  endIcon?: IconName;
  color: BadgeColor;
  radius?: keyof typeof Radius;
}

const SIZE_MAP: Record<
  BadgeSize,
  { height: string; padding: string; fontSize: string; gap: string }
> = {
  "1": {
    height: "20px",
    padding: "6px",
    fontSize: "12px",
    gap: "4px",
  },
  "2": {
    height: "24px",
    padding: "8px",
    fontSize: "14px",
    gap: "6px",
  },
  "3": {
    height: "28px",
    padding: "10px",
    fontSize: "16px",
    gap: "8px",
  },
};

const COLOR_MAP: Record<
  BadgeColor,
  Record<BadgeVariant, { bg: string; text: string; border: string }>
> = {
  RED: {
    solid: { bg: Color.RED_500, text: Color.WHITE, border: "transparent" },
    surface: { bg: Color.RED_300, text: Color.RED_900, border: "transparent" },
    outline: { bg: "transparent", text: Color.RED_500, border: Color.RED_500 },
  },
  BLUE: {
    solid: { bg: Color.BLUE_500, text: Color.WHITE, border: "transparent" },
    surface: {
      bg: Color.BLUE_300,
      text: Color.BLUE_900,
      border: "transparent",
    },
    outline: {
      bg: "transparent",
      text: Color.BLUE_500,
      border: Color.BLUE_500,
    },
  },
  GRAY: {
    solid: { bg: Color.GRAY_500, text: Color.WHITE, border: "transparent" },
    surface: {
      bg: Color.GRAY_300,
      text: Color.GRAY_900,
      border: "transparent",
    },
    outline: {
      bg: "transparent",
      text: Color.GRAY_500,
      border: Color.GRAY_500,
    },
  },
  TEAL: {
    solid: { bg: Color.TEAL_500, text: Color.WHITE, border: "transparent" },
    surface: {
      bg: Color.TEAL_300,
      text: Color.TEAL_900,
      border: "transparent",
    },
    outline: {
      bg: "transparent",
      text: Color.TEAL_500,
      border: Color.TEAL_500,
    },
  },
  ORANGE: {
    solid: { bg: Color.ORANGE_500, text: Color.WHITE, border: "transparent" },
    surface: {
      bg: Color.ORANGE_300,
      text: Color.ORANGE_900,
      border: "transparent",
    },
    outline: {
      bg: "transparent",
      text: Color.ORANGE_500,
      border: Color.ORANGE_500,
    },
  },
  GREEN: {
    solid: { bg: Color.GREEN_500, text: Color.WHITE, border: "transparent" },
    surface: {
      bg: Color.GREEN_300,
      text: Color.GREEN_900,
      border: "transparent",
    },
    outline: {
      bg: "transparent",
      text: Color.GREEN_500,
      border: Color.GREEN_500,
    },
  },
};

const TestBadge = ({
  label,
  size = "2",
  variant = "surface",
  startIcon,
  endIcon,
  color,
  radius = "medium",
}: BadgeProps) => {
  const badgeColor = COLOR_MAP[color][variant];
  const badgeSize = SIZE_MAP[size];

  return (
    <Badge
      color={badgeColor.bg}
      border="1px solid transparent"
      borderColor={badgeColor.border}
      radius={Radius[radius]}
      padding={badgeSize.padding}
      gap={badgeSize.gap}
    >
      {startIcon && (
        <Icon
          name={startIcon}
          size={badgeSize.fontSize}
          color={badgeColor.text}
        />
      )}
      {
        <Text
          fontSize={badgeSize.fontSize}
          color={badgeColor.text}
          weight="500"
          trim="end"
        >
          {label}
        </Text>
      }
      {endIcon && (
        <Icon
          name={endIcon}
          size={badgeSize.fontSize}
          color={badgeColor.text}
        />
      )}
    </Badge>
  );
};

export default TestBadge;
