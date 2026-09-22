import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, FormField, TimePicker } from "src/components";
import { useState } from "react";

const SIZES = ["1", "2", "3"] as const;
const VARIANTS = ["outline", "underline", "bubble"] as const;

const meta = {
  title: "Components/TimePicker",
  component: TimePicker,
  args: { size: "2", variant: "outline", format: "HH:mm", minuteStep: 5 },
  argTypes: {
    size: { control: "radio", options: SIZES },
    variant: { control: "radio", options: VARIANTS },
    format: { control: "radio", options: ["HH:mm", "hh:mm a", "HH:mm:ss"] },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(args.value ?? null);
    return <TimePicker {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TwelveHour: Story = {
  args: { format: "hh:mm a", value: "14:30" },
};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {SIZES.map((size) => (
        <TimePicker key={size} {...args} size={size} value="09:30" />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {VARIANTS.map((variant) => (
        <TimePicker key={variant} {...args} variant={variant} />
      ))}
    </Flex>
  ),
};

export const State: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      <TimePicker {...args} value="09:30" error />
      <TimePicker {...args} value="09:30" readOnly />
      <TimePicker {...args} value="09:30" disabled />
    </Flex>
  ),
};

export const WithFormField: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);
    return (
      <FormField
        label="시작 시간"
        required
        error={value ? undefined : "시간을 선택하세요"}
      >
        <TimePicker {...args} value={value} onChange={setValue} />
      </FormField>
    );
  },
};
