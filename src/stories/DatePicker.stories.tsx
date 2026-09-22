import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker, Flex, FormField } from "src/components";
import { useState } from "react";

const SIZES = ["1", "2", "3"] as const;
const VARIANTS = ["outline", "underline", "bubble"] as const;

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  args: { size: "2", variant: "outline", format: "y-MM-dd" },
  argTypes: {
    size: { control: "radio", options: SIZES },
    variant: { control: "radio", options: VARIANTS },
  },
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(args.value ?? null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {SIZES.map((size) => (
        <DatePicker key={size} {...args} size={size} value={new Date()} />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {VARIANTS.map((variant) => (
        <DatePicker key={variant} {...args} variant={variant} />
      ))}
    </Flex>
  ),
};

export const State: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      <DatePicker {...args} value={new Date()} error />
      <DatePicker {...args} value={new Date()} readOnly />
      <DatePicker {...args} value={new Date()} disabled />
    </Flex>
  ),
};

export const MinMax: Story = {
  args: {
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(),
  },
};

export const WithFormField: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <FormField
        label="시작일"
        required
        error={value ? undefined : "날짜를 선택하세요"}
      >
        <DatePicker {...args} value={value} onChange={setValue} />
      </FormField>
    );
  },
};
