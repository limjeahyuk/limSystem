import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DateRangePicker,
  Flex,
  FormField,
  type DateRange,
} from "src/components";
import { useState } from "react";

const SIZES = ["1", "2", "3"] as const;
const VARIANTS = ["outline", "underline", "bubble"] as const;
const today = new Date();
const RANGE: DateRange = [
  new Date(today.getFullYear(), today.getMonth(), 3),
  new Date(today.getFullYear(), today.getMonth(), 12),
];

const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  args: { size: "2", variant: "outline", showDoubleView: true },
  argTypes: {
    size: { control: "radio", options: SIZES },
    variant: { control: "radio", options: VARIANTS },
  },
  render: function Render(args) {
    const [value, setValue] = useState<DateRange | null>(args.value ?? null);
    return <DateRangePicker {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SingleView: Story = { args: { showDoubleView: false } };

export const Size: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {SIZES.map((size) => (
        <DateRangePicker key={size} {...args} size={size} value={RANGE} />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      {VARIANTS.map((variant) => (
        <DateRangePicker key={variant} {...args} variant={variant} />
      ))}
    </Flex>
  ),
};

export const State: Story = {
  render: (args) => (
    <Flex gap={10} align="start">
      <DateRangePicker {...args} value={RANGE} error />
      <DateRangePicker {...args} value={RANGE} readOnly />
      <DateRangePicker {...args} value={RANGE} disabled />
    </Flex>
  ),
};

export const WithFormField: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<DateRange | null>(null);
    return (
      <FormField
        label="기간"
        required
        error={value?.[1] ? undefined : "종료일까지 선택하세요"}
      >
        <DateRangePicker {...args} value={value} onChange={setValue} />
      </FormField>
    );
  },
};
