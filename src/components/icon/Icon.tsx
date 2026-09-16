import { ICON_DATA, type IconName } from "./icon-data";

export interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  style,
  className,
}: IconProps) => {
  const icon = ICON_DATA[name];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      fill={color}
      style={style}
      className={className}
      aria-hidden="true"
      viewBox={icon.viewBox}
    >
      {icon.paths.map((d, index) => (
        <path
          key={index}
          d={d}
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
        />
      ))}
    </svg>
  );
};

// 아이콘 슬롯: 이름 문자열이면 Icon으로, 노드면 그대로 렌더링
export type IconSlot = IconName | React.ReactNode;

const renderIcon = (slot: IconSlot | undefined) =>
  typeof slot === "string" ? <Icon name={slot as IconName} /> : slot;

export { Icon, renderIcon };
