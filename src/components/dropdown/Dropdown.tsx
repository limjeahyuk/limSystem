"use client";

import React, { createContext, forwardRef, useContext, useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset as offsetMiddleware,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  type Placement,
} from "@floating-ui/react";
import { Icon } from "../icon/Icon";
import Text from "../text/Text";
import styles from "./Dropdown.module.css";

interface DropdownContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  isPositioned: boolean;
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error(
      "Dropdown.* 컴포넌트는 <Dropdown> 안에서만 사용할 수 있습니다.",
    );
  return ctx;
};

export interface DropdownProps {
  children: React.ReactNode;
  placement?: Placement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerMode?: "click" | "hover" | "both";
  offset?: number;
  strategy?: "absolute" | "fixed";
}

const DropdownRoot = ({
  children,
  placement = "bottom-start",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  triggerMode = "click",
  offset = 4,
  strategy = "absolute",
}: DropdownProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
    isPositioned,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    strategy,
    whileElementsMounted: autoUpdate,
    middleware: [offsetMiddleware(offset), flip(), shift({ padding: 8 })],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { enabled: triggerMode !== "hover" }),
    useHover(context, {
      enabled: triggerMode !== "click",
      delay: { close: 100 },
    }),
    useDismiss(context),
  ]);

  return (
    <DropdownContext.Provider
      value={{
        open,
        setOpen,
        setReference,
        setFloating,
        floatingStyles,
        isPositioned,
        getReferenceProps,
        getFloatingProps,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

type SlotChild = React.ReactElement<
  Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
>;

// 자식 요소에 ref와 인터랙션 props를 주입한다 (asChild 패턴)
const Trigger = ({ children }: { children: SlotChild }) => {
  const { setReference, getReferenceProps } = useDropdown();
  const ref = useMergeRefs([setReference, children.props.ref ?? null]);
  return React.cloneElement(children, {
    ...getReferenceProps(children.props),
    ref,
  });
};

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  padding?: string;
  radius?: string;
}

const Content = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      width = "auto",
      height,
      padding = "4px",
      radius = "var(--ls-radius-large)",
      className,
      style,
      children,
      ...rest
    },
    propRef,
  ) => {
    const {
      open,
      setFloating,
      floatingStyles,
      isPositioned,
      getFloatingProps,
    } = useDropdown();
    const ref = useMergeRefs([setFloating, propRef]);
    if (!open) return null;

    return (
      <FloatingPortal>
        <div
          ref={ref}
          className={[styles.content, className].filter(Boolean).join(" ")}
          style={{
            ...floatingStyles,
            visibility: isPositioned ? "visible" : "hidden",
            zIndex: 1200,
            width,
            height,
            padding,
            borderRadius: radius,
            ...style,
          }}
          {...getFloatingProps(rest)}
        >
          {children}
        </div>
      </FloatingPortal>
    );
  },
);
Content.displayName = "Dropdown.Content";

export interface DropdownItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  selected?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  gap?: string;
  /* 클릭 시 자동으로 닫는다. 메뉴를 열어둔 채 상태만 바꾸려면 false */
  closeOnClick?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Item = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      selected,
      startIcon,
      endIcon,
      gap = "0px",
      closeOnClick = true,
      onClick,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const { setOpen } = useDropdown();
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={[styles.item, className].filter(Boolean).join(" ")}
        data-selected={selected || undefined}
        style={{ "--gap": gap, ...style } as React.CSSProperties}
        onClick={(e) => {
          onClick?.(e);
          if (closeOnClick) setOpen(false);
        }}
        {...rest}
      >
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        <span className={styles.label}>
          <Text size="2">{children}</Text>
        </span>
        {selected && (
          <span className={styles.endIcon}>
            <Icon name="check" />
          </span>
        )}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </button>
    );
  },
);
Item.displayName = "Dropdown.Item";

const Dropdown = Object.assign(DropdownRoot, { Trigger, Content, Item });

export { useDropdown };
export default Dropdown;
