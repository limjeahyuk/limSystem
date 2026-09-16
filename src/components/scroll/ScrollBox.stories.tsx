import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../layouts";
import { Text } from "../text";
import { Color } from "util/theme";
import ScrollBox from "./ScrollBox";

const meta = {
  title: "Components/ScrollBox",
  component: ScrollBox,
  args: { children: null, height: "200px", width: "300px", variant: "body" },
  argTypes: {
    variant: { control: "radio", options: ["list", "popover", "body", "grid"] },
  },
  render: (args) => (
    <ScrollBox {...args}>
      {Array.from({ length: 30 }, (_, i) => (
        <Box key={i} p={8} bg={i % 2 ? Color.GRAY_50 : Color.WHITE}>
          <Text>Row {i + 1}</Text>
        </Box>
      ))}
    </ScrollBox>
  ),
} satisfies Meta<typeof ScrollBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
