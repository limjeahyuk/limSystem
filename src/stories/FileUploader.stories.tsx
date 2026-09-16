import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileUploader, Flex, FormField, type UploadFile } from "src/components";

const SIZES = ["1", "2", "3"] as const;

const LIST: UploadFile[] = [
  { id: "1", name: "첨부파일_01.jpg" },
  { id: "2", name: "첨부파일_성공_02.jpg", status: "success" },
  { id: "3", name: "첨부파일_업로드중_03.jpg", status: "uploading" },
  {
    id: "4",
    name: "첨부파일_실패_04.jpg",
    status: "error",
    error: "용량을 초과하였습니다.",
  },
];

const meta = {
  title: "Components/FileUploader",
  component: FileUploader,
  args: { variant: "button", size: "2", width: "440px" },
  argTypes: {
    variant: {
      control: "radio",
      options: ["input", "button-input", "button", "dropzone"],
    },
    size: { control: "radio", options: SIZES },
  },
  // 선택한 File을 목록에 쌓고, 삭제하면 빼는 최소 컨트롤드 예제
  render: function Render(args) {
    const [files, setFiles] = useState<UploadFile[]>([]);
    return (
      <FormField
        label="첨부파일"
        description="파일당 최대 50MB, 총 10건까지 등록 가능합니다."
      >
        <FileUploader
          {...args}
          files={files}
          multiple
          onSelect={(picked) =>
            setFiles((prev) => [
              ...prev,
              ...picked.map((f) => ({
                id: `${f.name}-${f.size}`,
                name: f.name,
              })),
            ])
          }
          onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
        />
      </FormField>
    );
  },
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const single = [LIST[0]];

export const InputStates: Story = {
  render: () => (
    <Flex row gap={16} align="start">
      {SIZES.map((size) => (
        <Flex key={size} gap={20} width={300}>
          <FormField description="2MB이내로 등록해 주세요.">
            <FileUploader variant="input" size={size} />
          </FormField>
          <FileUploader
            variant="input"
            size={size}
            files={single}
            onRemove={() => {}}
          />
          <FormField error="용량을 초과하였습니다.">
            <FileUploader
              variant="input"
              size={size}
              files={single}
              onRemove={() => {}}
            />
          </FormField>
          <FileUploader variant="input" size={size} files={single} readOnly />
          <FileUploader variant="input" size={size} files={single} disabled />
        </Flex>
      ))}
    </Flex>
  ),
};

export const ButtonInputStates: Story = {
  render: () => (
    <Flex row gap={16} align="start">
      {SIZES.map((size) => (
        <Flex key={size} gap={20} width={300}>
          <FileUploader
            variant="button-input"
            size={size}
            placeholder="5MB이내, png, jpg 파일만 등록 가능"
          />
          <FileUploader variant="button-input" size={size} files={single} />
          <FormField error="용량을 초과하였습니다.">
            <FileUploader variant="button-input" size={size} files={single} />
          </FormField>
          <FileUploader
            variant="button-input"
            size={size}
            files={single}
            readOnly
          />
          <FileUploader
            variant="button-input"
            size={size}
            files={single}
            disabled
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const ButtonWithList: Story = {
  render: () => (
    <Flex gap={32} width={300}>
      <FormField
        label="첨부파일"
        description="파일당 최대 50MB, 총 10건까지 등록 가능합니다."
      >
        <FileUploader variant="button" files={LIST} onRemove={() => {}} />
      </FormField>
      <FormField
        label="첨부파일"
        description="파일당 최대 50MB, 총 10건까지 등록 가능합니다."
      >
        <FileUploader variant="button" disabled />
      </FormField>
    </Flex>
  ),
};

export const Dropzone: Story = {
  render: () => (
    <Flex gap={32} width={440}>
      <FormField
        label="첨부파일"
        description="파일당 최대 50MB, 총 10건까지 등록 가능합니다."
      >
        <FileUploader variant="dropzone" files={LIST} onRemove={() => {}} />
      </FormField>
      <FormField
        label="첨부파일"
        description="파일당 최대 50MB, 총 10건까지 등록 가능합니다."
      >
        <FileUploader variant="dropzone" disabled />
      </FormField>
    </Flex>
  ),
};
