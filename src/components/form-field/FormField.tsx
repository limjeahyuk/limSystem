"use client";

import React, { forwardRef, useId } from "react";
import { Text } from "../text";
import styles from "./FormField.module.css";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** error가 있으면 가려진다. 둘은 같은 자리를 쓴다 */
  description?: React.ReactNode;
  /** 있으면 description을 대체하고, 래퍼에 data-color="RED"를 붙인다 */
  error?: React.ReactNode;
  required?: boolean;
  /** 설명 위치. 파일 업로더처럼 입력 위에 안내가 오는 경우 "top" */
  descriptionPlacement?: "top" | "bottom";
  /** 요소 하나만. id와 aria를 cloneElement로 주입하므로 Fragment·자식 여럿은 깨진다 */
  children: React.ReactElement<Record<string, unknown>>;
}

// 라벨 / 설명 / 에러를 입력 컴포넌트에 묶는다. 자식에 id와 aria 속성을 주입
const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      error,
      required,
      descriptionPlacement = "bottom",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = (children.props.id as string | undefined) ?? generatedId;
    const describedBy =
      [description && `${id}-desc`, error && `${id}-err`]
        .filter(Boolean)
        .join(" ") || undefined;

    const hint = description && !error && (
      <p id={`${id}-desc`} className={styles.hint}>
        {description}
      </p>
    );

    return (
      <div
        ref={ref}
        className={[styles.field, className].filter(Boolean).join(" ")}
        data-color={error ? "RED" : undefined}
        {...rest}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            <Text size="2" weight="500">
              {label}
            </Text>
            {required && (
              <span className={styles.required} data-color="RED">
                *
              </span>
            )}
          </label>
        )}
        {descriptionPlacement === "top" && hint}
        {React.cloneElement(children, {
          id,
          "aria-describedby": describedBy,
          "aria-invalid": error ? true : undefined,
          "aria-required": required || undefined,
        })}
        {descriptionPlacement === "bottom" && hint}
        {error && (
          <p id={`${id}-err`} className={styles.error} data-color="RED">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
