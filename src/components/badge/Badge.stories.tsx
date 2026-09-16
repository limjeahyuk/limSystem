import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../layouts";
import { Radius } from "util/theme";
import Badge from "./Badge";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const VARIANTS = ["solid", "surface", "outline"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    label: "Badge",
    size: "2",
    variant: "surface",
    color: "BLUE",
    radius: "medium",
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    variant: { control: "radio", options: VARIANTS },
    color: { control: "select", options: COLORS },
    radius: { control: "select", options: Object.keys(Radius) },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={10} align="center">
      {(["1", "2", "3"] as const).map((size) => (
        <Badge key={size} {...args} size={size} label={`size ${size}`} />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10}>
      {VARIANTS.map((variant) => (
        <Flex key={variant} row gap={10}>
          {COLORS.map((color) => (
            <Badge
              key={color}
              {...args}
              variant={variant}
              color={color}
              label={color}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const WithIcon: Story = {
  args: { startIcon: "check", endIcon: "chevron-right" },
};
