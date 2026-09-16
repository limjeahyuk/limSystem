import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Flex } from "../layouts";
import { Radius } from "util/theme";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { label: "Inbox", value: "inbox" },
  { label: "Drafts", value: "drafts" },
  { label: "Sent", value: "sent" },
];

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  args: { options: OPTIONS, value: "inbox", size: "2", radius: "medium" },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    radius: { control: "select", options: Object.keys(Radius) },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {(["1", "2", "3"] as const).map((size) => (
        <SegmentedControl key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("drafts");
    return (
      <Flex gap={10} align="start">
        <SegmentedControl {...args} value={value} onChange={setValue} />
        <span>value: {value}</span>
      </Flex>
    );
  },
};

export const Disabled: Story = { args: { disabled: true } };
