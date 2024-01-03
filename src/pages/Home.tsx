import styled from "styled-components";

import { TypingInfo } from "components/Typinginfo";
import { Typing } from "components/Typing";

export const Home = () => {
  return (
    <Container>
      <TypingInfo />
      <Typing />
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  height: 450px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  background-color: ${({ theme }) => theme.bgColor2};
  border-radius: 12px;
`;
