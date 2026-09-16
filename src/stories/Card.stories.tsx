import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, Flex, Heading, Text } from "src/components";

const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    children: null,
    variant: "surface",
    size: "2",
    width: 320,
  },
  argTypes: {
    variant: { control: "radio", options: ["surface", "outline", "ghost"] },
    size: { control: "radio", options: ["1", "2", "3"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = () => (
  <Flex row={false} gap={8}>
    <Heading as="h3" size="4">
      프로젝트 설정
    </Heading>
    <Text color="var(--ls-text-secondary)">
      팀원 초대, 권한, 알림 설정을 관리합니다.
    </Text>
    <Flex row justify="end" gap={8}>
      <Button variant="ghost" color="GRAY" size="2">
        취소
      </Button>
      <Button size="2">저장</Button>
    </Flex>
  </Flex>
);

export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <Content />
    </Card>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex row gap={16}>
      {(["surface", "outline", "ghost"] as const).map((variant) => (
        <Card key={variant} {...args} variant={variant}>
          <Content />
        </Card>
      ))}
    </Flex>
  ),
};
