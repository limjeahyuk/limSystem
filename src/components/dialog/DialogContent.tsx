import React from "react";
import { useDialog } from "./Dialog";
import { useMergeRefs } from "@floating-ui/react";
import styled from "@emotion/styled";
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
      <StyledDialogContent
        ref={mergedRef}
        {...getFloatingProps()}
        style={style}
      >
        {onClose && (
          <StyledIconClaseButton
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
          <StyledFooter>
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
          </StyledFooter>
        ) : null}
      </StyledDialogContent>
    );
  },
);
DialogContent.displayName = "DialogContent";

const StyledIconClaseButton = styled(IconButton)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const StyledDialogContent = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledFooter = styled.div`
  padding: 16px 24px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
`;
