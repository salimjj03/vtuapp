/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {

  primary: {
      DEFAULT: "#4CAF50",
      first: "#9CD1B2",
      second: "#D7ECDF"
      },
  white: {
            DEFAULT: "#ffffff"
        },
  background: {
      DEFAULT: "#f0f0f0",
      first: "#f9f9f9"
      },
    secondary: "gray",
    black: {
      DEFAULT: "#000",
      first: "#1E1E2D",
      second: "#232533",
    },
  gray: {
      DEFAULT: "#BDBDBD",
      first: "#DDDDDD",
      second: "#EDEDED"
      }
  ,
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
