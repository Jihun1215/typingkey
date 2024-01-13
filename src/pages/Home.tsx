import styled from "styled-components";

import { TypingInfo, BeforeInfo, Typing } from "components/";

export const Home = () => {
  return (
    <Container>
      <TypingInfo />
      <BeforeInfo />
      <Typing />
    </Container>
  );
};

const Container = styled.div`
  width: 880px;
  height: 250px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  border-radius: 12px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;
