import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SearchInput from "./SearchInput";

const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
  args: { placeholder: "검색어를 입력하세요", size: "2", width: "280px" },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
  },
  render: function Render(args) {
    const [value, setValue] = useState("");
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        onClear={() => setValue("")}
      />
    );
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const FullWidth: Story = { args: { fullWidth: true, width: undefined } };
