import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Flex, Tooltip } from "src/components";

const PLACEMENTS = ["top", "bottom", "left", "right"] as const;

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  args: {
    content: "Add to library",
    placement: "top",
    delay: 200,
    isArrow: false,
    offsetValue: 8,
    children: <Button>Hover me</Button>,
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        ...PLACEMENTS,
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
      ],
    },
  },
  decorators: [
    (Story) => (
      <Flex p={60} align="center">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithArrow: Story = { args: { isArrow: true } };

export const Placement: Story = {
  render: (args) => (
    <Flex row gap={40}>
      {PLACEMENTS.map((placement) => (
        <Tooltip
          key={placement}
          {...args}
          placement={placement}
          content={placement}
        >
          <Button>{placement}</Button>
        </Tooltip>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
