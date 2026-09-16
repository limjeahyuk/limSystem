import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Flex } from "../layouts";
import { Tab, TabNav } from "./index";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const LIST = [
  "Account",
  "Documents",
  { label: "Settings", value: "settings", disabled: true },
];

const meta = {
  title: "Components/Tab",
  component: Tab,
  args: {
    list: LIST,
    value: "Account",
    size: "2",
    color: "RED",
    onChange: () => {},
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2"] },
    color: { control: "select", options: COLORS },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <Tab {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={16}>
      {(["1", "2"] as const).map((size) => (
        <Tab key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const ColorStory: Story = {
  name: "Color",
  render: (args) => (
    <Flex gap={16}>
      {COLORS.map((color) => (
        <Tab key={color} {...args} color={color} />
      ))}
    </Flex>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Nav: Story = {
  render: (args) => (
    <TabNav
      size={args.size}
      color={args.color}
      currentPath="/docs"
      list={[
        { label: "Home", href: "/" },
        { label: "Docs", href: "/docs" },
        { label: "Blog", href: "/blog", disabled: true },
      ]}
    />
  ),
};
