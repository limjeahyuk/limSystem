import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Text } from "../text";
import Dialog from "./Dialog";
import { DialogContent } from "./DialogContent";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  args: {
    dimming: true,
    trigger: <Button label="Open dialog" onClick={() => {}} />,
    children: (
      <DialogContent
        title="Edit profile"
        desc="Make changes to your profile."
        content={<Text>Dialog content goes here.</Text>}
        onCancel={fn()}
        onSubmit={fn()}
        onClose={fn()}
      />
    ),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NoDimming: Story = { args: { dimming: false } };

export const CustomFooter: Story = {
  args: {
    children: (
      <DialogContent
        title="Custom footer"
        content={<Text>Footer is fully replaced.</Text>}
        footer={<Text style={{ padding: 16 }}>custom footer</Text>}
      />
    ),
  },
};
