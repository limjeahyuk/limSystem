"use client";

import { Box, Flex } from "src/components/layouts";
import { Icon } from "../components/Icon/Icon";
import SearchInput from "../components/input/SearchInput";
import Textarea from "../components/input/Textarea";
import TextInput from "../components/input/TextInput";
import SvgIcon from "../components/svg-icon/SvgIcon";
import { Color } from "../util/theme";
import { Text } from "src/components/text";
import Avatar from "src/components/avatar";
import { Badge, BadgeBasic } from "src/components/badge";
import Button from "src/components/button/Button";
import Callout from "src/components/callout";
import {
  HorizontalDivider,
  VerticalDivider,
} from "src/components/divider/Divider";

export default function Home() {
  return (
    <Flex gap={12} p={10} mb={100}>
      <Flex
        row
        align="baseline"
        gap={3}
        style={{
          borderBottom: `1px solid ${Color.GRAY_400}`,
        }}
      >
        <Text size="1" weight="400">
          A
        </Text>
        <Text size="2" weight="400">
          A
        </Text>
        <Text size="3" weight="400">
          A
        </Text>
        <Text size="4" weight="400">
          A
        </Text>
        <Text size="5" weight="400">
          A
        </Text>
        <Text size="6" weight="400">
          A
        </Text>
        <Text size="7" weight="400">
          A
        </Text>
        <Text size="8" weight="400">
          A
        </Text>
        <Text size="9" weight="400">
          A
        </Text>
      </Flex>

      <Flex gap={20}>
        <Text
          style={{
            background: Color.GRAY_300,
            borderTop: "1px dashed #111",
            borderBottom: "1px dashed #111",
          }}
        >
          dsajklfdjlkasjdflkjsdkfja
        </Text>
        <Text
          trim="both"
          style={{
            background: Color.GRAY_300,
            borderTop: "1px dashed #111",
            borderBottom: "1px dashed #111",
          }}
        >
          dsajklfdjlkasjdflkjsdkfja
        </Text>
        <Text
          trim="start"
          style={{
            background: Color.GRAY_300,
            borderTop: "1px dashed #111",
            borderBottom: "1px dashed #111",
          }}
        >
          dsajklfdjlkasjdflkjsdkfja
        </Text>
        <Text
          trim="end"
          style={{
            background: Color.GRAY_300,
            borderTop: "1px dashed #111",
            borderBottom: "1px dashed #111",
          }}
        >
          dsajklfdjlkasjdflkjsdkfja
        </Text>
      </Flex>

      <Flex width={300}>
        <Text wrap="nowrap">
          The goal of typography is to relate font size, line height, and line
          width in a proportional way that maximizes beauty and makes reading
          easier and more pleasant.
        </Text>
      </Flex>

      <Flex row gap={10} align="center" fullWidth justify="center">
        <Box width={300} height={300} bg={Color.BLUE_400} />

        <VerticalDivider height={200} color={Color.BLUE_200} />
        <Box width={200} height={200} bg={Color.BLUE_300} />

        <VerticalDivider height={100} color={Color.TEAL_500} />
        <Box width={100} height={100} bg={Color.BLUE_200} />

        <VerticalDivider color={Color.RED_500} />
        <Flex gap={5}>
          <Box width={10} height={10} bg={Color.RED_100} />
          <Box width={10} height={20} bg={Color.RED_200} />
          <Box width={20} height={10} bg={Color.RED_300} />
          <Box width={20} height={20} bg={Color.RED_400} />
        </Flex>
      </Flex>

      <TextInput placeholder="123132" />
      <Textarea placeholder="123" width="100%" />
      <SearchInput placeholder="123123" fullWidth />

      <SvgIcon name="zoomIn" color="#111" />
      <Icon name="zoom-in" color="#111" />

      <Flex row gap={5}>
        <Avatar
          src="data:image/jpeg;base64,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"
          size={80}
          radius="full"
        />

        <Avatar
          size={80}
          radius="medium"
          color={Color.GRAY_400}
          fallback={<Icon name="Print" size={40} />}
          onClick={() => console.log("1232123")}
        />
        <Avatar
          fallback="AB"
          size={80}
          radius="medium"
          color={Color.GRAY_400}
        />
      </Flex>

      <Flex row gap={5}>
        <BadgeBasic
          padding="8px"
          color={Color.TEAL_100}
          radius={12}
          border="1px solid #111"
          borderColor={Color.TEAL_300}
        >
          <Text size="2" color="#111" weight="700" trim="end">
            NEW
          </Text>
        </BadgeBasic>

        <Badge
          size="2"
          label="NEW"
          variant="outline"
          color="BLUE"
          radius="full"
        />
        <Badge
          size="2"
          label="NEW"
          startIcon="airplay"
          variant="solid"
          color="GRAY"
        />
        <Badge
          size="2"
          label="NEW"
          variant="surface"
          endIcon="bluetooth"
          color="ORANGE"
        />
      </Flex>

      <Flex row gap={4}>
        <Button
          variant="surface"
          color="GREEN"
          label="TEST"
          startIcon="Print"
          radius="large"
          onClick={() => {}}
        />

        <Button
          variant="surface"
          color="RED"
          label="TEST"
          startIcon="Print"
          radius="large"
          onClick={() => {}}
        />

        <Button
          variant="surface"
          color="GRAY"
          label="TEST"
          startIcon="Print"
          radius="large"
          onClick={() => {}}
        />

        <Button
          variant="surface"
          color="ORANGE"
          label="TEST"
          startIcon="Print"
          radius="large"
          onClick={() => {}}
        />

        <Button
          variant="surface"
          color="TEAL"
          label="TEST"
          startIcon="Print"
          radius="large"
          onClick={() => {}}
        />
      </Flex>

      <HorizontalDivider />

      <Flex gap={5}>
        <Callout
          variant="surface"
          size="1"
          label="The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasantThe goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasantThe goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant"
          fullWidth
          color="GREEN"
        />
        <Callout
          variant="surface"
          size="2"
          label={`123321
          21312312
          12312
          `}
          color="ORANGE"
          icon="airplay"
        />
        <Callout variant="surface" size="3" label="123" color="TEAL" asChild>
          <Flex row gap={12}>
            <Icon name="bookmark" size={20} />
            <Text size="4">children Callout</Text>
          </Flex>
        </Callout>
      </Flex>
    </Flex>
  );
}
