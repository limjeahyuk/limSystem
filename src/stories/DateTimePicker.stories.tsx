import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, FormField, DateTimePicker } from "src/components";
import { useState } from "react";

const SIZES = ["1", "2", "3"] as const;
const VARIANTS = ["outline", "underline", "bubble"] as const;
const NOW = new Date(2026, 8, 22, 9, 30);

const meta = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  args: {
    size: "2",
    variant: "outline",
    format: "y-MM-dd HH:mm",
    minuteStep: 5,
  },
  argTypes: {
    size: { control: "radio", options: SIZES },
    variant: { control: "radio", options: VARIANTS },
    format: { control: "radio", options: ["y-MM-dd HH:mm", "y-MM-dd hh:mm a"] },
  },
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(args.value ?? null);
    return <DateTimePicker {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TwelveHour: Story = {
  args: { format: "y-MM-dd hh:mm a", value: NOW },
};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {SIZES.map((size) => (
        <DateTimePicker key={size} {...args} size={size} value={NOW} />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {VARIANTS.map((variant) => (
        <DateTimePicker key={variant} {...args} variant={variant} />
      ))}
    </Flex>
  ),
};

export const State: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      <DateTimePicker {...args} value={NOW} error />
      <DateTimePicker {...args} value={NOW} readOnly />
      <DateTimePicker {...args} value={NOW} disabled />
    </Flex>
  ),
};

export const WithFormField: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <FormField
        label="시작 일시"
        required
        error={value ? undefined : "일시를 선택하세요"}
      >
        <DateTimePicker {...args} value={value} onChange={setValue} />
      </FormField>
    );
  },
};
