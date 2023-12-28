import { DefaultTheme, css } from "styled-components";

const colors: DefaultTheme["colors"] = {
  white: "#FFFFFF",
  black: "#000000",
  black2: "#13161B",
  red: "#f03e3e",
  blue: "#337ab7",
  gray: "#9A9A9A",
  deepblue: "#6366F1",
};

const WH100 = css`
  width: 100%;
  height: 100%;
`;

const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

const FlexCenter = css`
  justify-content: center;
  align-items: center;
`;

const BoxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const theme = {
  colors,
  WH100,
  FlexCol,
  FlexRow,
  FlexCenter,
  BoxCenter,
};

export const Theme: DefaultTheme = {
  ...theme,
  bgColor: "#f1f3f5",
  bgColor2: "#dee2e6",
  color: "#191A23",
  color2: "#E5E5E5",
};

export const DarkTheme: DefaultTheme = {
  ...theme,
  bgColor: "#111827",
  //   #1f2937
  bgColor2: "#333",
  color: "#FFFFFF99",
  color2: "#191A23",
};
