import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Icon } from "../icon/Icon";
import { Flex } from "../layouts";
import { Color } from "util/theme";
import TextInput from "./TextInput";

const SIZES = ["1", "2", "3"] as const;

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  args: { placeholder: "Enter text", size: "2", width: "280px" },
  argTypes: {
    size: { control: "radio", options: SIZES },
    textAlign: { control: "radio", options: ["start", "center", "end"] },
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value ?? "");
    return <TextInput {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10}>
      {SIZES.map((size) => (
        <TextInput
          key={size}
          {...args}
          size={size}
          placeholder={`size ${size}`}
        />
      ))}
    </Flex>
  ),
};

export const WithIcon: Story = {
  args: {
    leftIcon: <Icon name="search" size={20} color={Color.TEXT_PLACEHOLDER} />,
    rightIcon: <Icon name="close" size={16} color={Color.TEXT_TERTIARY} />,
  },
};

export const State: Story = {
  render: (args) => (
    <Flex gap={10}>
      <TextInput {...args} value="disabled" disabled />
      <TextInput {...args} value="readOnly" readOnly />
    </Flex>
  ),
};
