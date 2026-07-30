"use client";

import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
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
  const [isOpen, setIsOpen] = useState(true);
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
          <TooltipBox
            ref={floatingRef}
            style={{
              ...floatingStyles,
              visibility: isPositioned ? "visible" : "hidden",
              opacity: isPositioned ? 1 : 0,
            }}
            placement={finalPlacement}
            isPositioned={isPositioned}
            {...getFloatingProps()}
          >
            {content}
            {isArrow && (
              <StyledArrow
                ref={setArrowEl}
                context={context}
                fill={Color.GRAY_800}
              />
            )}
          </TooltipBox>
        </FloatingPortal>
      )}
    </>
  );
};

const TooltipBox = styled.div<{ placement: Placement; isPositioned?: boolean }>`
  z-index: 9999;
  max-width: 260px;
  padding: 2px 6px;

  background-color: ${Color.GRAY_800};
  color: #ffffff;
  border-radius: 4px;
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  word-break: keep-all;

  transform-origin: ${({ placement }) => {
    if (placement.startsWith("top")) return "bottom center";
    if (placement.startsWith("bottom")) return "top center";
    if (placement.startsWith("left")) return "right center";
    if (placement.startsWith("right")) return "left center";
    return "center";
  }};
`;

const StyledArrow = styled(FloatingArrow)`
  width: 10px;
  height: 5px;
`;

export default Tooltip;
