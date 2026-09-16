import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, Text } from "src/components";
import { Color } from "util/theme";

const SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const WEIGHTS = ["300", "400", "500", "600", "700"] as const;

const meta = {
  title: "Components/Text",
  component: Text,
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    size: "2",
    weight: "400",
  },
  argTypes: {
    as: { control: "radio", options: ["span", "div", "label", "p"] },
    size: { control: "select", options: SIZES },
    weight: { control: "radio", options: WEIGHTS },
    wrap: {
      control: "radio",
      options: ["wrap", "nowrap", "balance", "pretty"],
    },
    trim: { control: "radio", options: ["normal", "start", "end", "both"] },
    color: { control: "color" },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={6}>
      {SIZES.map((size) => (
        <Text
          key={size}
          {...args}
          size={size}
        >{`size ${size}: ${args.children}`}</Text>
      ))}
    </Flex>
  ),
};

export const Weight: Story = {
  render: (args) => (
    <Flex gap={6}>
      {WEIGHTS.map((weight) => (
        <Text
          key={weight}
          {...args}
          size="4"
          weight={weight}
        >{`weight ${weight}`}</Text>
      ))}
    </Flex>
  ),
};

export const Truncate: Story = {
  args: { truncate: true, style: { maxWidth: 160 } },
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
    style: { maxWidth: 200 },
    children: "Long text that will be clamped to two lines. ".repeat(5),
  },
};

export const ColorStory: Story = {
  name: "Color",
  args: { color: Color.ACCENT_600, weight: "600" },
};
