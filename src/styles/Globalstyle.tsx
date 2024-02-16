import { createGlobalStyle } from "styled-components";
// import { styleSheet } from "./font";

// import KCC_Ganpan from "assets/fonts/KCC-Ganpan.woff";
// import Pretendard_Medium from "assets/fonts/Pretendard-Medium.woff";

export const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow-x: hidden;
  width : 100vw;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-family: 'Noto Sans KR', 'Roboto'; 
}

/* Prevent Drag */
img {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

textarea {
  border: none;
  padding: .5rem;
  resize: none;
  white-space: pre-wrap;
}

* {
  box-sizing: border-box;
  text-decoration-line: none;
  color: inherit;
}

/* HashRoute smooth motion */
* {
  scroll-behavior: smooth;
}

*:focus {
    outline: none !important;
  }


  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 0 solid transparent;
    border-radius: 10px;
    background-color: #9A9A9A;
  }


`;
