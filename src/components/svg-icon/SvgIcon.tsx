import React from "react";
import { type IconName, icons } from ".";

type IconSize = number;
type IconColor = string;

type IconProps = {
  name: IconName;
  size?: IconSize;
  iconSize?: IconSize;
  color?: IconColor;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const SvgIcon = ({
  name,
  size = 24,
  color = "none",
  className,
  style,
}: IconProps) => {
  const Component = icons[name];
  if (!Component) return null;

  // const isOutlinedIcon = name.includes('outlined');

  return (
    <Component
      style={{ minWidth: size, height: size, color: color, ...style }}
      // fill={isOutlinedIcon ? 'none' : color}
      // stroke={isOutlinedIcon ? color : 'none'}
      className={className}
    />
  );
};

export default SvgIcon;
