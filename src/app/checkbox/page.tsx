"use client";

import { useState } from "react";
import { Badge } from "src/components/badge";
import {
  Checkbox,
  CheckboxGroup,
  MasterCheckbox,
  useCheckboxGroup,
} from "src/components/checkbox";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "src/components/data-list/DataList";
import { Box, Flex } from "src/components/layouts";
import { Text } from "src/components/text";
import { Color } from "util/theme";

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
          <CheckboxGroup
            options={JOB_OPTIONS}
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
          <CheckboxGroup
            options={JOB_OPTIONS}
            value={groupValue}
            onChange={setGroupValue}
          />
          {/* {JOB_OPTIONS.map((opt, index) => (
            <Checkbox
              key={index}
              label={opt.label}
              value={opt.value}
              checked={isChecked(opt.value)}
              onChange={() => toggle(opt.value)}
              size="2"
              color="RED"
            />
          ))} */}
        </Flex>
      </Flex>

      <Flex>
        <DataList>
          <DataListItem align="center">
            <DataListLabel>Status</DataListLabel>
            <DataListValue>
              <Flex>
                <Badge
                  label="Authorized"
                  variant="solid"
                  size="1"
                  color="BLUE"
                />
                <Text>11231212312</Text>
              </Flex>
            </DataListValue>
          </DataListItem>

          <DataListItem>
            <DataListLabel
              color={Color.BLUE_400}
              fontWeight={700}
              minWidth="100px"
            >
              ID
            </DataListLabel>
            <DataListValue color={Color.BLUE_700} fontWeight={500}>
              u_2J89JSA4GJ
            </DataListValue>
          </DataListItem>

          <DataListItem>
            <DataListLabel minWidth="200px">Name</DataListLabel>
            <DataListValue>Vlad Moroz</DataListValue>
          </DataListItem>

          <DataListItem>
            <DataListLabel>Email</DataListLabel>
            <DataListValue>vlad@workos.com</DataListValue>
          </DataListItem>
        </DataList>
      </Flex>

      <Box>
        <Badge label="Authorized" variant="solid" size="1" color="BLUE"></Badge>
      </Box>
    </Flex>
  );
}
