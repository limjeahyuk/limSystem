"use client";

import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  MasterCheckbox,
  useCheckboxGroup,
} from "src/components/checkbox";
import { Flex } from "src/components/layouts";
import { Text } from "src/components/text";

const JOB_OPTIONS = [
  { label: "바텐더", value: "1" },
  { label: "개발자", value: "2" },
  { label: "디자이너", value: "3" },
  { label: "퍼블리셔", value: "4" },
  { label: "기획자", value: "5" },
];

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [groupValue, setGroupValue] = useState<string[]>([]);

  const { selected, setSelected, isChecked, toggle } = useCheckboxGroup([]);

  return (
    <Flex mb={100} p={50} gap={20}>
      <Checkbox
        size="3"
        label={`선택 : ${checked ? "선택됨" : "미선택"}`}
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
      />

      <Flex gap={5}>
        <Flex row gap={5}>
          <MasterCheckbox
            options={[
              { label: "사과", value: "apple" },
              { label: "바나나", value: "banana" },
              { label: "오랜지", value: "orange" },
            ]}
            value={groupValue}
            onChange={setGroupValue}
            color="RED"
          />
          <Text size="3">선택 : {groupValue.join(", ")}</Text>
        </Flex>

        <Flex row gap={10}>
          <CheckboxGroup
            options={[
              { label: "사과", value: "apple" },
              { label: "바나나", value: "banana" },
              { label: "오랜지", value: "orange" },
            ]}
            value={groupValue}
            onChange={setGroupValue}
          />
        </Flex>
      </Flex>

      <Flex gap={10}>
        <Text size="3">현재 선택된 데이터: [ {selected.join(", ")} ]</Text>
        <MasterCheckbox
          label="job"
          options={JOB_OPTIONS}
          value={selected}
          onChange={setSelected}
          size="2"
          color="TEAL"
        />
        <Flex row gap={5}>
          {JOB_OPTIONS.map((opt, index) => (
            <Checkbox
              key={index}
              label={opt.label}
              value={opt.value}
              checked={isChecked(opt.value)}
              onChange={() => toggle(opt.value)}
              size="2"
              color="RED"
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
