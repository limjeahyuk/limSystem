import { Icon } from "./components/Icon/Icon";
import Box from "./components/layouts/Box";
import SvgIcon from "./components/svg-icon/SvgIcon";
import HeadingText from "./components/text/HeadingText";
import Text from "./components/text/Text";
import { Color } from "./util/Theme";

function App() {
  return (
    <Box gap={12}>
      <HeadingText variant="h1" color={Color.MONO_GREY_500}>
        h1 test
      </HeadingText>

      <HeadingText variant="h2">h2 test</HeadingText>

      <HeadingText variant="h3">h3 test</HeadingText>

      <HeadingText variant="h4">h4 test</HeadingText>

      <p color="#fff">p test</p>
      <span> span test</span>
      <a href="#">a test</a>
      <br />
      <input type="text" value="input test" />
      <textarea value="textarea test" />

      <Text size="24px" weight="700" color="#1b8cfd44">
        12323
      </Text>

      <SvgIcon name="zoomIn" color="#111" />
      <Icon name="zoom-in" color="#111" />
    </Box>
  );
}

export default App;
