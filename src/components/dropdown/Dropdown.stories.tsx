import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button";
import { Icon } from "../icon/Icon";
import Dropdown from "./Dropdown";
import DropdownContent from "./DropdownContent";
import DropdownMenuItem from "./DropdownItem";
import DropdownTrigger from "./DropdownTrigger";

const ITEMS = ["Edit", "Duplicate", "Archive", "Delete"];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    placement: "bottom-start",
    triggerMode: "click",
    offset: 4,
    trigger: <Button label="Open menu" onClick={() => {}} />,
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

export const SelectLike: Story = {
  render: function Render(args) {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    return (
      <Dropdown
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={
          <DropdownTrigger
            value={value}
            placeholder="선택하세요"
            width="240px"
            isOpen={open}
          />
        }
      >
        {(close) => (
          <DropdownContent width="240px">
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
