import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Button,
  Card,
  Flex,
  FormField,
  Select,
  Textarea,
  TextInput,
} from "src/components";

const meta = {
  title: "Components/FormField",
  component: FormField,
  args: {
    label: "이메일",
    description: "로그인에 사용할 이메일 주소",
    required: true,
    children: <TextInput placeholder="name@example.com" />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithError: Story = {
  args: { error: "올바른 이메일 형식이 아닙니다." },
};

export const OtherInputs: Story = {
  render: () => (
    <Flex row={false} gap={16} width={320}>
      <FormField label="역할">
        <Select
          options={[
            { value: "admin", label: "관리자" },
            { value: "member", label: "멤버" },
          ]}
          placeholder="선택"
        />
      </FormField>
      <FormField label="소개" description="200자 이내">
        <Textarea placeholder="간단한 소개" />
      </FormField>
    </Flex>
  ),
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const error =
    submitted && !email.includes("@") ? "이메일 형식을 확인하세요." : undefined;
  return (
    <Card width={360}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Flex row={false} gap={16}>
          <FormField label="이메일" required error={error}>
            <TextInput value={email} onChange={setEmail} />
          </FormField>
          <FormField label="비밀번호" required>
            <TextInput type="password" />
          </FormField>
          <Button type="submit" width="100%">
            로그인
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

export const LoginRecipe: Story = {
  render: () => <LoginForm />,
};
