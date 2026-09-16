import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Flex } from "../layouts";
import { Switch } from "./Switch";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: { size: "2", color: "BLUE" },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    color: { control: "select", options: COLORS },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={16} align="center">
      {(["1", "2", "3"] as const).map((size) => (
        <Switch key={size} {...args} size={size} defaultChecked />
      ))}
    </Flex>
  ),
};

export const ColorStory: Story = {
  name: "Color",
  render: (args) => (
    <Flex row gap={16}>
      {COLORS.map((color) => (
        <Switch key={color} {...args} color={color} defaultChecked />
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return (
      <Flex row gap={10} align="center">
        <Switch {...args} checked={checked} onChange={setChecked} />
        <span>{checked ? "on" : "off"}</span>
      </Flex>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Flex row gap={16}>
      <Switch {...args} disabled />
      <Switch {...args} disabled defaultChecked />
    </Flex>
  ),
};
