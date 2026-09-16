import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, Text, HorizontalDivider, VerticalDivider } from "src/components";
import { Color } from "util/theme";

const meta = {
  title: "Components/Divider",
  component: HorizontalDivider,
  argTypes: { color: { control: "color" } },
} satisfies Meta<typeof HorizontalDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <Flex gap={10} width={300}>
      <Text>Above</Text>
      <HorizontalDivider {...args} />
      <Text>Below</Text>
    </Flex>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Flex row gap={10} align="center" height={40}>
      <Text>Left</Text>
      <VerticalDivider color={args.color} />
      <Text>Right</Text>
    </Flex>
  ),
};

export const ColorStory: Story = {
  name: "Color",
  args: { color: Color.ACCENT_400, width: 200 },
  render: (args) => <HorizontalDivider {...args} />,
};
