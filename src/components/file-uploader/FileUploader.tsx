"use client";

import React, { forwardRef, useRef, useState } from "react";
import { Button } from "../button";
import { Icon } from "../icon/Icon";
import { Spinner } from "../spinner";
import { Text } from "../text";
import styles from "./FileUploader.module.css";

export type FileUploaderVariant =
  "input" | "button-input" | "button" | "dropzone";
export type FileUploaderSize = "1" | "2" | "3";
export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadFile {
  id: string;
  name: string;
  status?: UploadStatus;
  error?: React.ReactNode;
}

export interface FileUploaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  variant?: FileUploaderVariant;
  size?: FileUploaderSize;
  files?: UploadFile[];
  /* 사용자가 파일을 고르거나 드롭했을 때. 검증과 files 갱신은 호출자가 한다 */
  onSelect?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  placeholder?: string;
  buttonLabel?: React.ReactNode;
  dropzoneText?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  width?: React.CSSProperties["width"];
}

const STATUS_COLOR = { success: "GREEN", error: "RED" } as const;

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      variant = "button",
      size = "2",
      files = [],
      onSelect,
      onRemove,
      placeholder = "파일선택",
      buttonLabel = "파일첨부",
      dropzoneText = (
        <>
          파일을 여기로 끌어다 놓거나,
          <br />
          파일선택 버튼을 클릭해 업로드할 파일을 선택하세요.
        </>
      ),
      accept,
      multiple,
      disabled,
      readOnly,
      width = "100%",
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const inert = disabled || readOnly;
    const isSingle = variant === "input" || variant === "button-input";
    const first = files[0];

    const open = () => {
      if (!inert) inputRef.current?.click();
    };
    const handleFiles = (list: FileList | null) => {
      if (list?.length) onSelect?.(Array.from(list));
    };

    const attachButton = (
      <Button
        size={size === "1" ? "2" : size}
        radius="medium"
        startIcon="attachment"
        onClick={open}
        disabled={inert}
      >
        {buttonLabel}
      </Button>
    );

    const field = (
      <div className={styles.field}>
        <button
          type="button"
          className={styles.trigger}
          onClick={open}
          disabled={inert}
        >
          {first ? (
            <Text truncate>{first.name}</Text>
          ) : (
            <Text truncate className={styles.placeholder}>
              {placeholder}
            </Text>
          )}
        </button>
        {variant === "input" && (
          <>
            {first && !inert && onRemove && (
              <button
                type="button"
                className={styles.clear}
                onClick={() => onRemove(first.id)}
                aria-label="파일 삭제"
              >
                <Icon name="close-circle" size={16} />
              </button>
            )}
            <span className={styles.attachIcon}>
              <Icon name="attachment" size={16} />
            </span>
          </>
        )}
      </div>
    );

    const dropzone = (
      <div
        className={styles.dropzone}
        data-dragging={dragging || undefined}
        onDragOver={(e) => {
          e.preventDefault();
          if (!inert) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!inert) handleFiles(e.dataTransfer.files);
        }}
      >
        <Text align="center" className={styles.dropText}>
          {dropzoneText}
        </Text>
        {attachButton}
      </div>
    );

    const list = files.length > 0 && (
      <ul className={styles.list}>
        {files.map((f) => {
          const status = f.status ?? "idle";
          return (
            <li
              key={f.id}
              className={styles.item}
              data-status={status}
              data-color={STATUS_COLOR[status as keyof typeof STATUS_COLOR]}
            >
              <div className={styles.itemRow}>
                <Text truncate>{f.name}</Text>
                {status === "success" && (
                  <Icon
                    name="circle-check"
                    size={16}
                    className={styles.statusIcon}
                  />
                )}
                {status === "error" && (
                  <Icon
                    name="circle-warning"
                    size={16}
                    className={styles.statusIcon}
                  />
                )}
                {status === "uploading" && (
                  <Spinner size="1" aria-label="업로드 중" />
                )}
                {status !== "uploading" &&
                  status !== "success" &&
                  !inert &&
                  onRemove && (
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => onRemove(f.id)}
                      aria-label="파일 삭제"
                    >
                      <Icon name="close" size={16} />
                    </button>
                  )}
              </div>
              {status === "error" && f.error && (
                <Text size="1" className={styles.itemError}>
                  {f.error}
                </Text>
              )}
            </li>
          );
        })}
      </ul>
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-variant={variant}
        data-size={size}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        style={{ width, ...style }}
        {...rest}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.hidden}
          accept={accept}
          multiple={multiple && !isSingle}
          disabled={inert}
          tabIndex={-1}
          onChange={(e) => {
            handleFiles(e.target.files);
            // 같은 파일을 다시 고를 수 있게 초기화
            e.target.value = "";
          }}
        />
        {variant === "input" && field}
        {variant === "button-input" && (
          <div className={styles.row}>
            <Button
              size="2"
              color="GRAY"
              radius="medium"
              onClick={open}
              disabled={inert}
              style={{ height: "auto", alignSelf: "stretch" }}
            >
              {buttonLabel}
            </Button>
            {field}
          </div>
        )}
        {variant === "button" && attachButton}
        {variant === "dropzone" && dropzone}
        {!isSingle && list}
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";

export default FileUploader;
