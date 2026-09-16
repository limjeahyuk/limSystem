import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card, EmptyState } from "src/components";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: {
    title: "아직 프로젝트가 없습니다",
    description: "첫 프로젝트를 만들어 팀원과 작업을 시작하세요.",
    size: "2",
    children: <Button startIcon="plus">프로젝트 만들기</Button>,
  },
  argTypes: {
    size: { control: "radio", options: ["1", "2", "3"] },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SearchNoResult: Story = {
  args: {
    icon: "search",
    title: "검색 결과가 없습니다",
    description: "다른 검색어로 다시 시도해 보세요.",
    children: null,
  },
};

export const InCard: Story = {
  render: (args) => (
    <Card width={480}>
      <EmptyState {...args} />
    </Card>
  ),
};
