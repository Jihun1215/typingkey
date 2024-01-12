import styled from "styled-components";

import { TypingInfo, TotalInfo, Typing } from "components/";

export const Home = () => {
  return (
    <Container>
      <TypingInfo />
      <TotalInfo />
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
  border: 1px solid red;
  @media (max-width: 900px) {
    width: 90%;
  }
`;
