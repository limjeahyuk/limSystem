import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../layouts";
import Callout from "./index";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const VARIANTS = ["soft", "surface", "outline"] as const;

const meta = {
  title: "Components/Callout",
  component: Callout,
  args: {
    label:
      "You will need admin privileges to install and access this application.",
    size: "2",
    variant: "soft",
    color: "BLUE",
    icon: "circle-info",
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    variant: { control: "radio", options: VARIANTS },
    color: { control: "select", options: COLORS },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10}>
      {(["1", "2", "3"] as const).map((size) => (
        <Callout key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10}>
      {VARIANTS.map((variant) => (
        <Flex key={variant} gap={6}>
          {COLORS.map((color) => (
            <Callout
              key={color}
              {...args}
              variant={variant}
              color={color}
              label={`${variant} / ${color}`}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const AsChild: Story = {
  args: { asChild: true, children: <span>Custom children</span> },
};
