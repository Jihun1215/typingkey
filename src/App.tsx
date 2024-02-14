import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { QueryClient, QueryClientProvider } from "react-query";

import { useRecoilState } from "recoil";

import { GlobalStyle, Reset } from "styles";
import { Theme, DarkTheme } from "styles/theme";

import { ModeToggleState } from "state/atoms";

const queryClient = new QueryClient();

export const App = () => {
  const [darkMode] = useRecoilState(ModeToggleState);
  const theme = darkMode ? { ...DarkTheme } : { ...Theme };
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} position="bottom-left" /> */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Reset />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
