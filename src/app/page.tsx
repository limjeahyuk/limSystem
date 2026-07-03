"use client";

import Flex from "src/components/layouts/Flex";
import { Icon } from "../components/Icon/Icon";
import SearchInput from "../components/input/SearchInput";
import Textarea from "../components/input/Textarea";
import TextInput from "../components/input/TextInput";
import SvgIcon from "../components/svg-icon/SvgIcon";
import Text from "../components/text/Text";
import { Color } from "../util/Theme";
import Box from "src/components/layouts/Box";

export default function Home() {
  return (
    <Flex gap={12} style={{ padding: "10px" }}>
      <Flex
        row
        align="baseline"
        gap={3}
        style={{
          borderBottom: `1px solid ${Color.GRAY_400}`,
        }}
      >
        <Text size="1">A</Text>
        <Text size="2">A</Text>
        <Text size="3">A</Text>
        <Text size="4">A</Text>
        <Text size="5">A</Text>
        <Text size="6">A</Text>
        <Text size="7">A</Text>
        <Text size="8">A</Text>
        <Text size="9">A</Text>
      </Flex>

      <Flex row gap={10} align="center" fullWidth justify="center">
        <Box width={300} height={300} bg={Color.BLUE_400} />
        <Box width={200} height={200} bg={Color.BLUE_300} />
        <Box width={100} height={100} bg={Color.BLUE_200} />
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
    </Flex>
  );
}
