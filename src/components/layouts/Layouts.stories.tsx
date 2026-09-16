import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../text";
import { Color } from "util/theme";
import { Box, Flex, Grid } from "./index";

const Cell = ({ children }: { children: React.ReactNode }) => (
  <Box p={12} bg={Color.BLUE_100} radius={6}>
    <Text size="2">{children}</Text>
  </Box>
);

const meta = {
  title: "Components/Layouts",
  component: Flex,
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoxStory: Story = {
  name: "Box",
  render: () => (
    <Box p={20} m={10} bg={Color.GRAY_50} radius={8} width={300}>
      <Text>Box with p=20, m=10, radius=8</Text>
    </Box>
  ),
};

export const FlexStory: Story = {
  name: "Flex",
  args: { row: true, gap: 10, align: "center", justify: "start" },
  argTypes: {
    align: { control: "radio", options: ["start", "center", "end", "stretch"] },
    justify: {
      control: "radio",
      options: ["start", "center", "end", "between"],
    },
  },
  render: (args) => (
    <Flex {...args} p={10} bg={Color.GRAY_50} width={400} height={120}>
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
    </Flex>
  ),
};

export const GridStory: Story = {
  name: "Grid",
  render: () => (
    <Grid columns={3} gap={10} width={400}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  ),
};
