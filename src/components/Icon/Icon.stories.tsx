import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, Flex } from "../layouts";
import { Text } from "../text";
import { Color } from "util/theme";
import { Icon } from "./Icon";
import { ICON_DATA, type IconName } from "./icon-data";

const NAMES = Object.keys(ICON_DATA) as IconName[];

const meta = {
  title: "Components/Icon",
  component: Icon,
  args: { name: "search", size: 24, color: Color.GRAY_900 },
  argTypes: {
    name: { control: "select", options: NAMES },
    color: { control: "color" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Size: Story = {
  render: (args) => (
    <Flex row gap={16} align="center">
      {[16, 20, 24, 32, 48].map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const All: Story = {
  render: (args) => (
    <Grid columns="repeat(auto-fill, minmax(110px, 1fr))" gap={12}>
      {NAMES.map((name) => (
        <Flex key={name} align="center" gap={4} p={8}>
          <Icon {...args} name={name} />
          <Text
            size="1"
            color={Color.GRAY_600}
            truncate
            style={{ maxWidth: "100%" }}
          >
            {name}
          </Text>
        </Flex>
      ))}
    </Grid>
  ),
};
