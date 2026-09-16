import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Flex,
  Text,
  Checkbox,
  CheckboxGroup,
  MasterCheckbox,
  useCheckboxGroup,
} from "src/components";
import { useState } from "react";

const COLORS = ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const;
const OPTIONS = [
  { label: "사과", value: "apple" },
  { label: "바나나", value: "banana" },
  { label: "오렌지", value: "orange", disabled: true },
];

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: { label: "Label", size: "2", variant: "classic", color: "BLUE" },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    variant: { control: "radio", options: ["classic", "surface"] },
    color: { control: "select", options: COLORS },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={16}>
      {(["1", "2", "3"] as const).map((size) => (
        <Checkbox
          key={size}
          {...args}
          size={size}
          label={`size ${size}`}
          defaultChecked
        />
      ))}
    </Flex>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Flex gap={10}>
      {(["classic", "surface"] as const).map((variant) => (
        <Flex key={variant} row gap={16}>
          {COLORS.map((color) => (
            <Checkbox
              key={color}
              {...args}
              variant={variant}
              color={color}
              label={color}
              defaultChecked
            />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const State: Story = {
  render: (args) => (
    <Flex row gap={16}>
      <Checkbox {...args} label="unchecked" />
      <Checkbox {...args} label="checked" defaultChecked />
      <Checkbox {...args} label="indeterminate" indeterminate />
      <Checkbox {...args} label="disabled" disabled />
      <Checkbox {...args} label="disabled checked" disabled defaultChecked />
    </Flex>
  ),
};

export const Group: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(["apple"]);
    return (
      <Flex gap={10}>
        <Text size="3">선택: {value.join(", ")}</Text>
        <Flex row gap={16}>
          <CheckboxGroup
            {...args}
            options={OPTIONS}
            value={value}
            onChange={setValue}
          />
        </Flex>
      </Flex>
    );
  },
};

export const Master: Story = {
  render: function Render(args) {
    const { selected, setSelected, isChecked, toggle } = useCheckboxGroup([]);
    return (
      <Flex gap={10}>
        <MasterCheckbox
          {...args}
          label="전체 선택"
          options={OPTIONS}
          value={selected}
          onChange={setSelected}
        />
        <Flex row gap={16} pl={20}>
          {OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              {...args}
              label={opt.label}
              value={opt.value}
              disabled={opt.disabled}
              checked={isChecked(opt.value)}
              onChange={() => toggle(opt.value)}
            />
          ))}
        </Flex>
      </Flex>
    );
  },
};
