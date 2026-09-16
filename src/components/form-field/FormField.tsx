"use client";

import React, { forwardRef, useId } from "react";
import { Text } from "../text";
import styles from "./FormField.module.css";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactElement<Record<string, unknown>>;
}

// 라벨 / 설명 / 에러를 입력 컴포넌트에 묶는다. 자식에 id와 aria 속성을 주입
const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { label, description, error, required, className, children, ...rest },
    ref,
  ) => {
    const generatedId = useId();
    const id = (children.props.id as string | undefined) ?? generatedId;
    const describedBy =
      [description && `${id}-desc`, error && `${id}-err`]
        .filter(Boolean)
        .join(" ") || undefined;

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
        {React.cloneElement(children, {
          id,
          "aria-describedby": describedBy,
          "aria-invalid": error ? true : undefined,
          "aria-required": required || undefined,
        })}
        {description && !error && (
          <p id={`${id}-desc`} className={styles.hint}>
            {description}
          </p>
        )}
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
