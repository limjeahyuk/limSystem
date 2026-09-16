import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../layouts";
import { RadioGroup, useRadioGroup } from "./index";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Comfortable", value: "comfortable" },
  { label: "Compact", value: "compact", disabled: true },
];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  args: {
    options: OPTIONS,
    value: "default",
    size: "2",
    direction: "row",
    color: "RED",
    onChange: () => {},
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    direction: { control: "radio", options: ["row", "column"] },
    color: { control: "select", options: COLORS },
  },
  render: function Render(args) {
    const { value, onChange } = useRadioGroup(args.value);
    return <RadioGroup {...args} value={value} onChange={onChange} />;
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={16}>
      {(["1", "2", "3"] as const).map((size) => (
        <RadioGroup key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const ColorStory: Story = {
  name: "Color",
  render: (args) => (
    <Flex gap={16}>
      {COLORS.map((color) => (
        <RadioGroup key={color} {...args} color={color} />
      ))}
    </Flex>
  ),
};

export const Column: Story = { args: { direction: "column" } };
