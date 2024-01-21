import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { AlertModalState } from "state/atoms";

import { TypingInfo, BeforeInfo, Typing, Alert } from "components/";

export const Home = () => {
  const modalVisibility = useRecoilValue(AlertModalState);

  return (
    <Container>
      <TypingInfo />
      <BeforeInfo />
      <Typing />
      {modalVisibility && <Alert />}
    </Container>
  );
};

const Container = styled.div`
  width: 880px;
  height: 300px;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  border-radius: 12px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;
