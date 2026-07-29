"use client";

import React, { createContext, useContext, useState } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useMergeRefs,
  useInteractions,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react";
import styled from "@emotion/styled";

interface DialogContextType {
  setOpen: (open: boolean) => void;
  setFloating: (node: HTMLElement | null) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog component");
  }
  return context;
};

interface DialogProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  dimming?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({
  trigger,
  children,
  open: controlledOpen,
  dimming = true,
  onOpenChange,
}: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    setUncontrolledOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const {
    context,
    refs: { setReference, setFloating },
  } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const isTriggerElement = React.isValidElement(trigger);
  const triggerRef = isTriggerElement
    ? (trigger as React.ReactElement & React.RefAttributes<HTMLElement>).ref
    : undefined;
  const mergedReferenceRef = useMergeRefs([setReference, triggerRef]);

  const triggerElement = React.isValidElement(trigger)
    ? React.cloneElement(
        trigger as React.ReactElement,
        getReferenceProps({
          ref: mergedReferenceRef,
          ...(trigger.props as Record<string, unknown>),
        }),
      )
    : trigger;

  return (
    <DialogContext.Provider
      value={{ setOpen: handleOpenChange, setFloating, getFloatingProps }}
    >
      {triggerElement}

      {isOpen && (
        <FloatingPortal>
          <StyledOverlay dimming={dimming} lockScroll>
            <FloatingFocusManager context={context}>
              <>{children}</>
            </FloatingFocusManager>
          </StyledOverlay>
        </FloatingPortal>
      )}
    </DialogContext.Provider>
  );
};

const StyledOverlay = styled(FloatingOverlay)<{ dimming: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ dimming }) =>
    dimming ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  backdrop-filter: ${({ dimming }) => (dimming ? "blur(4px)" : "none")};
`;

export default Dialog;
