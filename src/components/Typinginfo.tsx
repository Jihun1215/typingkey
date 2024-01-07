import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { TypingCountState, TypingWrongCountState } from "state/atoms";

export const TypingInfo = () => {
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const typingCount = useRecoilValue(TypingCountState);
  // 타이핑 틀린 갯수 카운팅 하는 State
  const wrongCount = useRecoilValue(TypingWrongCountState);

  return (
    <Container>
      <OneArea>1</OneArea>
      <TwoArea></TwoArea>
      <CountArea>
        <WrongArea>틀린 갯수 {wrongCount}</WrongArea>
        <TypingArea>남은 문장 {typingCount} / 10</TypingArea>
      </CountArea>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 200px;
  margin: 25px auto;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  background: #fff;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.bgColor};
`;

const OneArea = styled.div`
  width: 33.3%;
  height: 100%;
  border: 1px solid red;
`;

const TwoArea = styled.div`
  width: 33.3%;
  height: 100%;
  border: 1px solid red;
`;

const CountArea = styled.div`
  width: 33.3%;
  height: 100%;
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 10px 0;
`;

const WrongArea = styled.div`
  width: 100%;
  height: 30%;
  ${({ theme }) => theme.BoxCenter};
  border: 2px solid ${({ theme }) => theme.bgColor2};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
`;

const TypingArea = styled.div`
  width: 100%;
  height: 30%;
  ${({ theme }) => theme.BoxCenter};
  border: 2px solid ${({ theme }) => theme.bgColor2};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  /* background-color: ${({ theme }) => theme.bgColor}; */
  /* c */
`;
