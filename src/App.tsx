import { Icon } from "./components/Icon/Icon";
import SearchInput from "./components/input/SearchInput";
import Textarea from "./components/input/Textarea";
import TextInput from "./components/input/TextInput";
import Box from "./components/layouts/Box";
import SvgIcon from "./components/svg-icon/SvgIcon";
import BodyText from "./components/text/BodyText";
import HeadingText from "./components/text/HeadingText";
import Text from "./components/text/Text";
import { Color } from "./util/Theme";

function App() {
  return (
    <Box gap={12} style={{ padding: "10px" }}>
      <HeadingText variant="h1" color={Color.MONO_GREY_500}>
        h1 test
      </HeadingText>

      <HeadingText variant="h2">h2 test</HeadingText>

      <HeadingText variant="h3">h3 test</HeadingText>

      <HeadingText variant="h4">h4 test</HeadingText>

      <BodyText size="large">test</BodyText>
      <BodyText size="small">test</BodyText>
      <a href="#">a test</a>
      <br />
      <TextInput placeholder="123132" />
      <Textarea placeholder="123" width="100%" />
      <SearchInput placeholder="123123" fullWidth />

      <Text size="24px" weight="700" color="#1b8cfd44">
        12323
      </Text>

      <SvgIcon name="zoomIn" color="#111" />
      <Icon name="zoom-in" color="#111" />
    </Box>
  );
}

export default App;
