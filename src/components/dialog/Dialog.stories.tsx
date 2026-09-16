import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Text } from "../text";
import Dialog from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  args: { children: null, dimming: true, onOpenChange: fn() },
  render: (args) => (
    <Dialog {...args}>
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.CloseButton />
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>Make changes to your profile.</Dialog.Description>
        <Dialog.Body>
          <Text>Dialog content goes here.</Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="ghost" color="GRAY">
              취소
            </Button>
          </Dialog.Close>
          <Button color="RED" onClick={fn()}>
            확인
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NoDimming: Story = { args: { dimming: false } };

export const NoFooter: Story = {
  render: (args) => (
    <Dialog {...args}>
      <Dialog.Trigger>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Notice</Dialog.Title>
        <Dialog.Body height="80px">
          <Text>Footer is optional.</Text>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  ),
};
