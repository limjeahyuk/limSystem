import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button";
import { Icon } from "../icon/Icon";
import Dropdown from "./Dropdown";

const ITEMS = ["Edit", "Duplicate", "Archive", "Delete"];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    children: null,
    placement: "bottom-start",
    triggerMode: "click",
    offset: 4,
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "right",
      ],
    },
    triggerMode: { control: "radio", options: ["click", "hover", "both"] },
  },
  render: (args) => (
    <Dropdown {...args}>
      <Dropdown.Trigger>
        <Button>Open menu</Button>
      </Dropdown.Trigger>
      <Dropdown.Content width="200px">
        {ITEMS.map((item) => (
          <Dropdown.Item key={item}>{item}</Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  ),
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Hover: Story = { args: { triggerMode: "hover" } };

export const WithIcons: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <Dropdown.Trigger>
        <Button>Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Content width="200px">
        <Dropdown.Item startIcon={<Icon name="edit-pen" size={16} />}>
          Edit
        </Dropdown.Item>
        <Dropdown.Item startIcon={<Icon name="copy" size={16} />}>
          Duplicate
        </Dropdown.Item>
        <Dropdown.Item startIcon={<Icon name="deleted" size={16} />} disabled>
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const Selectable: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("Edit");
    return (
      <Dropdown {...args}>
        <Dropdown.Trigger>
          <Button variant="outline" endIcon="chevron-down">
            {value}
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content width="200px">
          {ITEMS.map((item) => (
            <Dropdown.Item
              key={item}
              selected={value === item}
              onClick={() => setValue(item)}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <Dropdown {...args} open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger>
          <Button>{open ? "Close" : "Open"}</Button>
        </Dropdown.Trigger>
        <Dropdown.Content width="200px">
          <Dropdown.Item closeOnClick={false}>Stays open</Dropdown.Item>
          <Dropdown.Item>Closes</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};
