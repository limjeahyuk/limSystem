import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, Avatar } from "src/components";
import { Color, Radius } from "util/theme";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: { size: 40, fallback: "A", radius: "medium" },
  argTypes: {
    radius: { control: "select", options: Object.keys(Radius) },
    color: { control: "color" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Image: Story = {
  args: { src: "https://i.pravatar.cc/80" },
};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={10} align="center">
      {[24, 32, 40, 56, 72].map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const RadiusStory: Story = {
  name: "Radius",
  render: (args) => (
    <Flex row gap={10}>
      {(Object.keys(Radius) as (keyof typeof Radius)[]).map((radius) => (
        <Avatar key={radius} {...args} radius={radius} />
      ))}
    </Flex>
  ),
};

export const ColorStory: Story = {
  args: {
    fallback: "A123213123213",
  },

  name: "Color",

  render: (args) => (
    <Flex row gap={10}>
      {[
        Color.BORDER_STRONG,
        Color.ACCENT_400,
        Color.TEXT_TERTIARY,
        Color.BG_INVERSE,
      ].map((color) => (
        <Avatar key={color} {...args} color={color} />
      ))}
    </Flex>
  ),
};
