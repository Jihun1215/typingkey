import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { useRecoilState } from "recoil";

import { GlobalStyle, Reset } from "styles";
import { Theme, DarkTheme } from "styles/theme";

import { ModeToggleState } from "state/atoms";

export const App = () => {
  const [darkMode] = useRecoilState(ModeToggleState);
  const theme = darkMode ? { ...DarkTheme } : { ...Theme };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Reset />
      <Outlet />
    </ThemeProvider>
  );
};
