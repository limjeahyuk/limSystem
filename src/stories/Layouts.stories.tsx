import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, Box, Flex, Grid, Button, Badge, Switch, TextInput } from "src/components";
import { Color } from "util/theme";

const Cell = ({ children }: { children: React.ReactNode }) => (
  <Box p={12} bg={Color.ACCENT_100} radius={6}>
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
    <Box p={20} m={10} bg={Color.BG_MUTED} radius={8} width={300}>
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
    <Flex {...args} p={10} bg={Color.BG_MUTED} width={400} height={120}>
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

// 좁은 컨테이너: 리프 컨트롤은 크기를 유지하고 넘치며, 필드(TextInput)만 줄어든다
export const NarrowContainer: Story = {
  name: "Narrow container",
  render: () => (
    <Flex gap={16}>
      <Text size="2">width 240px / overflow hidden</Text>
      <Flex row gap={8} align="center" p={10} bg={Color.BG_MUTED} width={240} style={{ overflow: "hidden" }}>
        <Button>확인</Button>
        <Button variant="outline">취소하기</Button>
        <Badge>NEW</Badge>
        <Switch />
        <TextInput placeholder="줄어드는 필드" />
      </Flex>
      <Text size="2">wrap</Text>
      <Flex row wrap="wrap" gap={8} align="center" p={10} bg={Color.BG_MUTED} width={240}>
        <Button>확인</Button>
        <Button variant="outline">취소하기</Button>
        <Badge>NEW</Badge>
        <Switch />
        <TextInput placeholder="줄어드는 필드" />
      </Flex>
    </Flex>
  ),
};
