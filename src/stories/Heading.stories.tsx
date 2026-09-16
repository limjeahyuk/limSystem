import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, Heading } from "src/components";

const SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

const meta = {
  title: "Components/Heading",
  component: Heading,
  args: { children: "The quick brown fox", as: "h1", size: "6", weight: "400" },
  argTypes: {
    as: { control: "radio", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: { control: "select", options: SIZES },
    weight: { control: "radio", options: ["300", "400", "500", "700"] },
    color: { control: "color" },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex gap={6}>
      {SIZES.map((size) => (
        <Heading
          key={size}
          {...args}
          size={size}
        >{`size ${size}: ${args.children}`}</Heading>
      ))}
    </Flex>
  ),
};
