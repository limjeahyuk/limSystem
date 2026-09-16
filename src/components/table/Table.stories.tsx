import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "./Table";

const ROWS = [
  { name: "Danilo Sousa", email: "danilo@example.com", group: "Developer" },
  { name: "Zahra Ambessa", email: "zahra@example.com", group: "Admin" },
  { name: "Jasper Eriksson", email: "jasper@example.com", group: "Developer" },
];

const meta = {
  title: "Components/Table",
  component: Table,
  args: {
    children: null,
    size: "2",
    variant: "surface",
    style: { width: 500 },
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
    variant: { control: "radio", options: ["surface", "ghost"] },
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableColumnHeaderCell>Full name</TableColumnHeaderCell>
          <TableColumnHeaderCell>Email</TableColumnHeaderCell>
          <TableColumnHeaderCell align="right">Group</TableColumnHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row) => (
          <TableRow key={row.email}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell align="right">{row.group}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Ghost: Story = { args: { variant: "ghost" } };
