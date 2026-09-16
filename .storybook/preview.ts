import type { Preview } from "@storybook/react-vite";
import "../src/css-reset/reset.css";
import "../src/util/theme.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
