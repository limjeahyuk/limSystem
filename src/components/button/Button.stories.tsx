import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Flex } from "../layouts";
import { Radius } from "util/theme";
import Button from "./Button";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const VARIANTS = ["solid", "outline", "surface", "ghost"] as const;

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    label: "Button",
    size: "2",
    variant: "solid",
    color: "BLUE",
    radius: "none",
    onClick: fn(),
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3", "4"] },
    variant: { control: "radio", options: VARIANTS },
    color: { control: "select", options: COLORS },
    radius: { control: "select", options: Object.keys(Radius) },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={10} align="center">
      {(["1", "2", "3", "4"] as const).map((size) => (
        <Button key={size} {...args} size={size} label={`size ${size}`} />
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
            <Button
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
  args: { startIcon: "plus", endIcon: "chevron-down" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
