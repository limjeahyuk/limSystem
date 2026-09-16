import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Flex, ToastProvider, useToast } from "src/components";

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  args: { children: null, position: "bottom-right", duration: 4000 },
  argTypes: {
    position: {
      control: "radio",
      options: ["top-right", "bottom-right", "bottom-center"],
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = () => {
  const { toast } = useToast();
  return (
    <Flex row gap={8}>
      <Button onClick={() => toast({ title: "저장되었습니다" })}>기본</Button>
      <Button
        color="GREEN"
        onClick={() =>
          toast({
            title: "업로드 완료",
            description: "3개 파일이 업로드되었습니다.",
            color: "GREEN",
            icon: "circle-check",
          })
        }
      >
        성공
      </Button>
      <Button
        color="RED"
        onClick={() =>
          toast({
            title: "저장 실패",
            description: "네트워크 상태를 확인하세요.",
            color: "RED",
            icon: "circle-warning",
            duration: 0,
          })
        }
      >
        에러 (수동 닫기)
      </Button>
    </Flex>
  );
};

export const Playground: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <Demo />
    </ToastProvider>
  ),
};
