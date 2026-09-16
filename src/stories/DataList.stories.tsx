import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Badge,
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "src/components";
import { Color } from "util/theme";

const meta = {
  title: "Components/DataList",
  component: DataList,
  args: {
    children: null,
    orientation: "horizontal",
    size: "2",
    width: "400px",
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    size: { control: "radio", options: ["1", "2", "3"] },
  },
  render: (args) => (
    <DataList {...args}>
      <DataListItem align="center">
        <DataListLabel minWidth="88px" color={Color.TEXT_SECONDARY}>
          Status
        </DataListLabel>
        <DataListValue>
          <Badge color="GREEN" variant="surface">
            Authorized
          </Badge>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel minWidth="88px" color={Color.TEXT_SECONDARY}>
          ID
        </DataListLabel>
        <DataListValue>u_2J89JSA4GJ</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel minWidth="88px" color={Color.TEXT_SECONDARY}>
          Name
        </DataListLabel>
        <DataListValue>Vlad Moroz</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel minWidth="88px" color={Color.TEXT_SECONDARY}>
          Email
        </DataListLabel>
        <DataListValue>vlad@workos.com</DataListValue>
      </DataListItem>
    </DataList>
  ),
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Vertical: Story = { args: { orientation: "vertical" } };
