import { DefaultTheme, css } from "styled-components";

const colors: DefaultTheme["colors"] = {
  white: "#FFFFFF",
  black: "#000000",
  black2: "#13161B",
  red: "#f03e3e",
  blue: "#337ab7",
  gray1: "#F6F6F6",
  gray2: "#DBDBDB",
  gray3: "#9A9A9A",
  gray4: "#878787",
  gray5: "#4D4D4D",
  greey: "#69db7c",
  lightblue: "#74c0fc",
  deepblue: "#6366F1",
  lavender: "#8A7EBE",
};

const KCCFontTitle = css`
  font-size: 30px;
  font-weight: 700;
  font-family: "KCC-Ganpan";
`;

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
  KCCFontTitle,
};

export const Theme: DefaultTheme = {
  ...theme,
  bgColor: "#f1f3f5",
  bgColor2: "#ced4da",
  color: "#191A23",
  color2: "#E5E5E5",
};

export const DarkTheme: DefaultTheme = {
  ...theme,
  bgColor: "#111827",
  bgColor2: "#1F2937",
  // color: "#FFFFFF99",
  color: "#FFF",
  color2: "#191A23",
};
