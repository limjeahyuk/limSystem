import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Flex, Spinner } from "src/components";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  args: { size: "2" },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    color: {
      control: "select",
      options: ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={16} align="center">
      {(["1", "2", "3"] as const).map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const InButton: Story = {
  render: () => (
    <Button disabled startIcon={<Spinner size="1" color="GRAY" />}>
      저장 중
    </Button>
  ),
};
