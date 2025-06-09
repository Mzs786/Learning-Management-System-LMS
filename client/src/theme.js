import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Default color mode
    useSystemColorMode: false, // Avoid using system preferences
  },
  styles: {
    global: {
      "html, body": {
        bg: "transparent", // Let Tailwind handle the body background
        color: "inherit",
      },
    },
  },
});

export default theme;
