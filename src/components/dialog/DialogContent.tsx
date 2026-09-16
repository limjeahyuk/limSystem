import React from "react";
import { useDialog } from "./Dialog";
import { useMergeRefs } from "@floating-ui/react";
import styles from "./Dialog.module.css";
import { Button } from "../button";
import { Box } from "../layouts";
import ScrollBox from "../scroll/ScrollBox";
import { Color } from "util/theme";
import { Text } from "../text";
import IconButton from "../button/IconButton";

interface DialogContentProps {
  title?: string;
  desc?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;

  onCancel?: () => void;
  onSubmit?: () => void;
  onClose?: () => void;

  cancelText?: string;
  submitText?: string;

  style?: React.CSSProperties;
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(
  (
    {
      title,
      desc,
      content,
      footer,
      onCancel,
      onSubmit,
      onClose,
      cancelText = "취소",
      submitText = "확인",
      style,
    },
    propRef,
  ) => {
    const { setOpen, setFloating, getFloatingProps } = useDialog();
    const mergedRef = useMergeRefs([setFloating, propRef]);

    const handleClose = () => {
      onClose?.();
      setOpen(false);
    };

    const handleCancel = () => {
      onCancel?.();
      setOpen(false);
    };

    const handleSubmit = () => {
      onSubmit?.();
    };

    return (
      <div
        className={styles.content}
        ref={mergedRef}
        {...getFloatingProps()}
        style={style}
      >
        {onClose && (
          <IconButton
            className={styles.close}
            onClick={handleClose}
            name="close"
            size="3"
            radius="full"
            variant="ghost"
            color="GRAY"
          />
        )}

        {(title || desc) && (
          <Box p={24} pb={0}>
            {title &&
              (typeof title === "string" ? (
                <Text size="6" weight="600" color={Color.BLACK}>
                  {title}
                </Text>
              ) : (
                title
              ))}
            {desc &&
              (typeof desc === "string" ? (
                <Text size="3" weight="400" color={Color.GRAY_700}>
                  {desc}
                </Text>
              ) : (
                desc
              ))}
          </Box>
        )}
        <Box p={24} pr={0}>
          <ScrollBox variant="popover" height="200px">
            {content}
          </ScrollBox>
        </Box>
        {footer !== undefined ? (
          footer
        ) : onCancel || onSubmit ? (
          <div className={styles.footer}>
            {onCancel && (
              <Button
                variant="solid"
                color="GRAY"
                onClick={handleCancel}
                label={cancelText}
              />
            )}
            {onSubmit && (
              <Button
                variant="solid"
                color="RED"
                onClick={handleSubmit}
                label={submitText}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  },
);
DialogContent.displayName = "DialogContent";
