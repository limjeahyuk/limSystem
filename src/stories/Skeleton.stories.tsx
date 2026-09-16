import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button, Card, Flex, Skeleton, Text } from "src/components";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  args: { children: null, width: 200, height: 16 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <Flex row gap={16} align="center">
      <Skeleton width={40} height={40} radius={999} />
      <Flex row={false} gap={8}>
        <Skeleton width={160} height={14} />
        <Skeleton width={100} height={12} />
      </Flex>
    </Flex>
  ),
};

const LoadingCard = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Flex row={false} gap={12} width={320}>
      <Card>
        <Flex row={false} gap={8}>
          <Skeleton loading={loading}>
            <Text size="4" weight="600">
              주간 리포트
            </Text>
          </Skeleton>
          <Skeleton loading={loading}>
            <Text>이번 주 방문자는 지난주보다 12% 늘었습니다.</Text>
          </Skeleton>
        </Flex>
      </Card>
      <Button variant="outline" onClick={() => setLoading((v) => !v)}>
        {loading ? "로딩 끝" : "다시 로딩"}
      </Button>
    </Flex>
  );
};

export const WrapContent: Story = {
  render: () => <LoadingCard />,
};
