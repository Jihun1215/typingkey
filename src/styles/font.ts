import KCC_Ganpan from "assets/fonts/KCC-Ganpan.woff";
import Pretendard_Medium from "assets/fonts/Pretendard-Medium.woff";

const fontStyles = `
  @font-face {
    font-family: "Pretendard-Regular";
    font-style: normal;
    src: url(${KCC_Ganpan}) format("woff");
  }


  @font-face {
    font-family: "Pretendard-Regular";
    font-style: normal;
    src: url(${Pretendard_Medium}) format("woff");
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = fontStyles;
document.head.appendChild(styleSheet);
