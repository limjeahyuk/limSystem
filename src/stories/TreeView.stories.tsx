import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Flex, TreeView, type TreeNode } from "src/components";

const item = (id: string, extra?: Partial<TreeNode>): TreeNode => ({
  id,
  label: "Tree View Item",
  ...extra,
});

const DATA: TreeNode[] = [
  item("1", {
    children: [
      item("1-1", {
        children: [
          item("1-1-1", {
            children: [item("1-1-1-1", { children: [item("1-1-1-1-1")] })],
          }),
        ],
      }),
    ],
  }),
  item("2", { children: [item("2-1")] }),
  item("3", { children: [item("3-1")] }),
  item("4", { children: [item("4-1")] }),
  item("5", { children: [item("5-1")] }),
  item("6", { disabled: true, children: [item("6-1")] }),
];

const withExtra = (
  nodes: TreeNode[],
  extra: (n: TreeNode) => Partial<TreeNode>,
): TreeNode[] =>
  nodes.map((n) => ({
    ...n,
    ...extra(n),
    children: n.children && withExtra(n.children, extra),
  }));

const meta = {
  title: "Components/TreeView",
  component: TreeView,
  args: {
    data: DATA,
    defaultExpanded: ["1", "1-1", "1-1-1", "1-1-1-1"],
    style: { width: 320 },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"],
    },
  },
  render: function Render(args) {
    const [selected, setSelected] = useState<string | null>("4");
    const [checked, setChecked] = useState<string[]>(["1-1-1-1-1", "3-1"]);
    return (
      <TreeView
        {...args}
        selected={selected}
        onSelect={setSelected}
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelection: Story = {};

export const Checkbox: Story = { args: { checkable: true } };

export const Icons: Story = {
  args: { data: withExtra(DATA, () => ({ icon: "calendar-empty" })) },
};

export const Badges: Story = {
  args: {
    data: withExtra(DATA, (n) =>
      n.id === "1-1" || n.id === "3" ? { badge: n.id === "3" ? 35 : 2 } : {},
    ),

    style: {
      width: 300,
    },

    color: "BLUE",
  },
};

export const All: Story = {
  args: {
    checkable: true,
    data: withExtra(DATA, (n) => ({
      icon: "calendar-empty",
      badge: n.id === "2" ? 2 : undefined,
    })),
  },
};

export const Color: Story = {
  args: { checkable: true },
  render: (args) => (
    <Flex row gap={24} wrap="wrap">
      {(["GRAY", "BLUE", "RED", "TEAL", "ORANGE", "GREEN"] as const).map(
        (color) => (
          <TreeView
            key={color}
            {...args}
            color={color}
            selected="2"
            checked={["1-1-1-1-1", "3-1"]}
            style={{ width: 240 }}
          />
        ),
      )}
    </Flex>
  ),
};
