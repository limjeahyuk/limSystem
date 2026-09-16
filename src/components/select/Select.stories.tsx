import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Flex } from "../layouts";
import { Radius } from "util/theme";
import { Select } from "./Select";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const VARIANTS = ["surface", "classic", "soft", "ghost"] as const;
const OPTIONS = [
  { label: "바텐더", value: "1" },
  { label: "개발자", value: "2" },
  { label: "디자이너", value: "3", disabled: true },
  { label: "퍼블리셔", value: "4" },
];
const GROUPED = [
  {
    label: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Orange", value: "orange" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot" },
      { label: "Potato", value: "potato" },
    ],
  },
];

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    options: OPTIONS,
    placeholder: "선택하세요",
    size: "2",
    variant: "surface",
    color: "GRAY",
    radius: "medium",
    style: { width: 200 },
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    variant: { control: "radio", options: VARIANTS },
    color: { control: "select", options: COLORS },
    radius: { control: "select", options: Object.keys(Radius) },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={10} align="start">
      {(["1", "2", "3"] as const).map((size) => (
        <Select key={size} {...args} size={size} defaultValue="2" />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex row gap={10} align="start">
      {VARIANTS.map((variant) => (
        <Select
          key={variant}
          {...args}
          variant={variant}
          placeholder={variant}
        />
      ))}
    </Flex>
  ),
};

export const Grouped: Story = { args: { options: GROUPED } };

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("");
    return (
      <Flex gap={10} align="start">
        <Select {...args} value={value} onChange={setValue} />
        <span>value: {value || "(none)"}</span>
      </Flex>
    );
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "1" } };
