import KCC_Ganpan from "assets/fonts/KCC-Ganpan.woff";
import KBO_Dia_Bold from "assets/fonts/KBO-Dia-Gothic_bold.woff";

const fontStyles = `
  @font-face {
    font-family: "Pretendard-Regular";
    font-style: normal;
    src: url(${KCC_Ganpan}) format("woff");
  }


  @font-face {
    font-family: "KBO-Dia-Gothic_bold";
    font-style: normal;
    src: url(${KBO_Dia_Bold}) format("woff");
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = fontStyles;
document.head.appendChild(styleSheet);
