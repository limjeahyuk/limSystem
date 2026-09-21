import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  BottomSheet,
  Button,
  CheckboxGroup,
  Flex,
  HorizontalDivider,
  MasterCheckbox,
  useCheckboxGroup,
} from "src/components";

const meta = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  args: { children: null, dismissible: true },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const AVATARS = ["A", "B", "C", "D", "E", "F"];

export const Header: Story = {
  render: (args) => (
    <BottomSheet {...args}>
      <BottomSheet.Trigger>
        <Button>프로필 사진 선택</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.CloseButton />
        <BottomSheet.Title>미리보기</BottomSheet.Title>
        <BottomSheet.Body>
          <Flex row wrap="wrap" justify="center" gap={16}>
            {AVATARS.map((a) => (
              <Avatar key={a} fallback={a} size={72} radius="large" />
            ))}
          </Flex>
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <BottomSheet.Close>
            <Button variant="surface" size="4" width="100%">
              내 사진첩에서 선택
            </Button>
          </BottomSheet.Close>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  ),
};

const TERMS = [
  { value: "tos", label: "[필수] 서비스 이용약관" },
  { value: "privacy", label: "[필수] 개인정보 처리방침" },
  { value: "age", label: "[필수] 만 14세 이상" },
  { value: "marketing", label: "[선택] 마케팅 정보 수신 동의" },
];
const REQUIRED = ["tos", "privacy", "age"];

const ConsentSheet = () => {
  const group = useCheckboxGroup();
  const canProceed = REQUIRED.every(group.isChecked);
  return (
    <BottomSheet dismissible={false} defaultOpen>
      <BottomSheet.Trigger>
        <Button>약관 동의 열기</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Content>
        <BottomSheet.Title>
          서비스 이용을 위해
          <br />
          동의가 필요해요
        </BottomSheet.Title>
        <BottomSheet.Body>
          <Flex row={false} gap={12}>
            <MasterCheckbox
              options={TERMS}
              value={group.selected}
              onChange={group.setSelected}
              label="모두 동의합니다."
            />
            <HorizontalDivider />
            <CheckboxGroup
              options={TERMS}
              value={group.selected}
              onChange={group.setSelected}
            />
          </Flex>
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <BottomSheet.Close>
            <Button size="4" width="100%" disabled={!canProceed}>
              동의하고 시작하기
            </Button>
          </BottomSheet.Close>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export const Confirm: Story = {
  render: () => <ConsentSheet />,
};

export const SnapPoints: Story = {
  render: (args) => (
    <BottomSheet {...args}>
      <BottomSheet.Trigger>
        <Button>40% / 90% 스냅</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Content snapPoints={["40%", "90%"]}>
        <BottomSheet.CloseButton />
        <BottomSheet.Title>긴 목록</BottomSheet.Title>
        <BottomSheet.Body>
          <Flex row={false} gap={8}>
            {Array.from({ length: 40 }, (_, i) => (
              <Button key={i} variant="ghost" color="GRAY">
                항목 {i + 1}
              </Button>
            ))}
          </Flex>
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  ),
};
