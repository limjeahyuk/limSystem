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
  type FloatingContext,
} from "@floating-ui/react";
import { Color } from "util/theme";
import IconButton from "../button/IconButton";
import { Box } from "../layouts";
import ScrollBox from "../scroll/ScrollBox";
import { Text } from "../text";
import styles from "./Dialog.module.css";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  dimming: boolean;
  context: FloatingContext;
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx)
    throw new Error(
      "Dialog.* 컴포넌트는 <Dialog> 안에서만 사용할 수 있습니다.",
    );
  return ctx;
};

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  dimming?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogRoot = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  dimming = true,
  onOpenChange,
}: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const { context, refs } = useFloating({ open, onOpenChange: setOpen });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, { outsidePressEvent: "mousedown" }),
    useRole(context),
  ]);

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        dimming,
        context,
        setReference: refs.setReference,
        setFloating: refs.setFloating,
        getReferenceProps,
        getFloatingProps,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

type SlotChild = React.ReactElement<
  Record<string, unknown> & { ref?: React.Ref<HTMLElement> }
>;

// 자식 요소에 ref와 인터랙션 props를 주입한다 (asChild 패턴)
const cloneWithProps = (
  child: SlotChild,
  ref: React.Ref<HTMLElement>,
  props: Record<string, unknown>,
) => React.cloneElement(child, { ...props, ref });

const Trigger = ({ children }: { children: SlotChild }) => {
  const { setReference, getReferenceProps } = useDialog();
  const ref = useMergeRefs([setReference, children.props.ref ?? null]);
  return cloneWithProps(children, ref, getReferenceProps(children.props));
};

const Close = ({ children }: { children: SlotChild }) => {
  const { setOpen } = useDialog();
  return cloneWithProps(children, children.props.ref ?? null, {
    onClick: (e: React.MouseEvent) => {
      (children.props.onClick as React.MouseEventHandler | undefined)?.(e);
      setOpen(false);
    },
  });
};

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Content = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...rest }, propRef) => {
    const { open, dimming, context, setFloating, getFloatingProps } =
      useDialog();
    const ref = useMergeRefs([setFloating, propRef]);
    if (!open) return null;

    return (
      <FloatingPortal>
        <FloatingOverlay
          className={styles.overlay}
          data-dimming={dimming || undefined}
          lockScroll
        >
          <FloatingFocusManager context={context}>
            <div
              ref={ref}
              className={[styles.content, className].filter(Boolean).join(" ")}
              {...getFloatingProps(rest)}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);
Content.displayName = "Dialog.Content";

const Title = ({ children }: { children: React.ReactNode }) => (
  <Box px={24} pt={24}>
    <Text as="div" size="6" weight="600" color={Color.TEXT_PRIMARY}>
      {children}
    </Text>
  </Box>
);

const Description = ({ children }: { children: React.ReactNode }) => (
  <Box px={24} pt={4}>
    <Text as="div" size="3" color={Color.TEXT_SECONDARY}>
      {children}
    </Text>
  </Box>
);

const Body = ({
  children,
  height = "200px",
}: {
  children: React.ReactNode;
  /** 내용이 짧아도 기본 200px를 차지한다. 내용에 맞추려면 "auto" */
  height?: string;
}) => (
  <Box p={24} pr={0}>
    <ScrollBox variant="popover" height={height}>
      {children}
    </ScrollBox>
  </Box>
);

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.footer}>{children}</div>
);

const CloseButton = () => {
  const { setOpen } = useDialog();
  return (
    <IconButton
      className={styles.close}
      name="close"
      size="3"
      radius="full"
      variant="ghost"
      color="GRAY"
      aria-label="close"
      onClick={() => setOpen(false)}
    />
  );
};

const Dialog = Object.assign(DialogRoot, {
  Trigger,
  Content,
  Title,
  Description,
  Body,
  Footer,
  Close,
  CloseButton,
});

export default Dialog;
