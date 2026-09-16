import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Flex } from "src/components/layouts";
import { Radius } from "util/theme";
import Textarea from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "Reply to comment",
    size: "2",
    variant: "surface",
    color: "GRAY",
    radius: "large",
    resize: "none",
    width: "320px",
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    variant: { control: "radio", options: ["classic", "surface", "soft"] },
    color: {
      control: "select",
      options: ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"],
    },
    radius: { control: "select", options: Object.keys(Radius) },
    resize: {
      control: "radio",
      options: ["none", "vertical", "horizontal", "both"],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10}>
      {(["1", "2", "3"] as const).map((size) => (
        <Textarea
          key={size}
          {...args}
          size={size}
          placeholder={`size ${size}`}
        />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10}>
      {(["classic", "surface", "soft"] as const).map((variant) => (
        <Textarea
          key={variant}
          {...args}
          variant={variant}
          placeholder={variant}
        />
      ))}
    </Flex>
  ),
};

export const Color: Story = {
  args: { variant: "soft" },
  render: (args) => (
    <Flex row gap={10} wrap="wrap">
      {(["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const).map(
        (color) => (
          <Textarea
            key={color}
            {...args}
            color={color}
            placeholder={color}
            width="160px"
          />
        ),
      )}
    </Flex>
  ),
};

export const RadiusStory: Story = {
  name: "Radius",
  render: (args) => (
    <Flex row gap={10} wrap="wrap">
      {(Object.keys(Radius) as (keyof typeof Radius)[]).map((radius) => (
        <Textarea
          key={radius}
          {...args}
          radius={radius}
          placeholder={radius}
          width="160px"
        />
      ))}
    </Flex>
  ),
};

export const Resize: Story = {
  render: (args) => (
    <Flex row gap={10} wrap="wrap">
      {(["none", "vertical", "horizontal", "both"] as const).map((resize) => (
        <Textarea
          key={resize}
          {...args}
          resize={resize}
          placeholder={resize}
          width="160px"
        />
      ))}
    </Flex>
  ),
};

export const State: Story = {
  render: (args) => (
    <Flex row gap={10}>
      <Textarea {...args} disabled defaultValue="disabled" />
      <Textarea {...args} readOnly defaultValue="readOnly" />
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("");
    return (
      <Flex gap={6}>
        <Textarea {...args} value={value} maxLength={100} onChange={setValue} />
        <span>{value.length} / 100</span>
      </Flex>
    );
  },
};
