/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * The color palette is generated using the following link where the primary color was my selection: https://www.realtimecolors.com/?colors=180b02-fdf9f6-fe8e25-8cf2c4-43b6ef&fonts=Poppins-Poppins
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  /**
   * --text: #1f1309;
    --background: #fcf7f4;
    --primary: #fe8e25;
    --secondary: #8bdeba;
    --accent: #6ab1d4;
   */
  light: {
    text: '#1f1309',
    background: '#fcf7f4',
    primary: "#fe8e25",
    secondary: "#8bdeba",
    accent: "#6ab1d4",
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  /**
   * --text: #fdf0e6;
    --background: #0a0502;
    --background: #151718;
    --primary: #da6a01;
    --secondary: #0d7547;
    --accent: #1082ba;
   */
  dark: {
    text: '#fdf0e6',
    background: '#151718',
    primary: "#da6a01",
    secondary: "#0d7547",
    accent: "#1082ba",
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/**
 *     text: '#ECEDEE',
    background: '#151718',

 */
