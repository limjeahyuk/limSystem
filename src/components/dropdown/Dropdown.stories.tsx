import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button";
import { Icon } from "../icon/Icon";
import Dropdown from "./Dropdown";
import DropdownContent from "./DropdownContent";
import DropdownMenuItem from "./DropdownItem";

const ITEMS = ["Edit", "Duplicate", "Archive", "Delete"];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    placement: "bottom-start",
    triggerMode: "click",
    offset: 4,
    trigger: <Button>Open menu</Button>,
    children: (close: () => void) => (
      <DropdownContent width="200px">
        {ITEMS.map((item) => (
          <DropdownMenuItem key={item} onClick={close}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownContent>
    ),
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
    triggerMode: {
      control: "radio",
      options: ["click", "hover", "both", "disabled"],
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Hover: Story = { args: { triggerMode: "hover" } };

export const WithIcons: Story = {
  args: {
    children: (close: () => void) => (
      <DropdownContent width="200px">
        <DropdownMenuItem
          onClick={close}
          startIcon={<Icon name="edit-pen" size={16} />}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={close}
          startIcon={<Icon name="copy" size={16} />}
        >
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={close}
          startIcon={<Icon name="deleted" size={16} />}
        >
          Delete
        </DropdownMenuItem>
      </DropdownContent>
    ),
  },
};

export const Selectable: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("Edit");
    return (
      <Dropdown
        {...args}
        trigger={
          <Button variant="outline" endIcon="chevron-down">
            {value}
          </Button>
        }
      >
        {(close) => (
          <DropdownContent width="200px">
            {ITEMS.map((item) => (
              <DropdownMenuItem
                key={item}
                selected={value === item}
                onClick={() => {
                  setValue(item);
                  close();
                }}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownContent>
        )}
      </Dropdown>
    );
  },
};
