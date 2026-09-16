"use client";

import React, { useState, useCallback } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  Placement,
  safePolygon,
} from "@floating-ui/react";
import { Color } from "util/theme";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement<React.HTMLProps<HTMLElement>>;
  placement?: Placement;
  delay?: number;
  disabled?: boolean;
  isArrow?: boolean;
  offsetValue?: number;
}

const setRef = (
  ref: React.Ref<HTMLElement> | undefined,
  value: HTMLElement | null,
) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && "current" in ref) {
    (ref as React.MutableRefObject<HTMLElement | null>).current = value;
  }
};

const Tooltip = ({
  content,
  children,
  placement = "top",
  delay = 200,
  disabled = false,
  isArrow = false,
  offsetValue = 8,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [arrowEl, setArrowEl] = useState<SVGSVGElement | null>(null);

  const {
    refs,
    floatingStyles,
    context,
    placement: finalPlacement,
    isPositioned,
  } = useFloating({
    open: isOpen && !disabled,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 20 }),
      arrow({ element: arrowEl }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: delay, close: 150 },
    handleClose: safePolygon({
      buffer: 1,
    }),
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const childRef = (
    children as React.ReactElement & {
      ref?: React.Ref<HTMLElement>;
    }
  ).ref;

  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
      setRef(childRef, node);
    },
    [refs, childRef],
  );

  const floatingRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  if (disabled || !content) {
    return children;
  }

  const trigger = React.cloneElement(children, {
    ref: mergedRef,
    ...getReferenceProps(children.props),
  });

  return (
    <>
      {trigger}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={floatingRef}
            className={styles.tooltip}
            data-placement={finalPlacement}
            style={{
              ...floatingStyles,
              visibility: isPositioned ? "visible" : "hidden",
              opacity: isPositioned ? 1 : 0,
            }}
            {...getFloatingProps()}
          >
            {content}
            {isArrow && (
              <FloatingArrow
                className={styles.arrow}
                ref={setArrowEl}
                context={context}
                fill={Color.BG_INVERSE}
              />
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
