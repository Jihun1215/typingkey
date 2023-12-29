import styled from "styled-components";
import { Outlet } from "react-router-dom";

import { Header, Footer } from "shared";

export const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      <Footer />
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 20px 0;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
`;
