import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  TypingWrongCountState,
  TypingTimeState,
  TypingProgressState,
  // TypingAccuracyState,
} from "state/atoms";

export const TypingInfo = () => {
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const typingCount = useRecoilValue(TypingCountState);
  // 타이핑 틀린 갯수 카운팅 하는 State
  const wrongCount = useRecoilValue(TypingWrongCountState);

  // 최초 타이핑 후 지속된 시간 State
  const time = useRecoilValue(TypingTimeState);

  const progress = useRecoilValue(TypingProgressState);

  // const accuracy = useRecoilValue(TypingAccuracyState);
  // console.log(accuracy);

  return (
    <Container>
      <OneArea>진행도: {progress}</OneArea>
      <TwoArea>타이핑 시간: {time}</TwoArea>
      <CountArea>
        <WrongArea>틀린 갯수: {wrongCount}</WrongArea>
        <TypingArea>남은 문장 {typingCount} / 10</TypingArea>
      </CountArea>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  /* margin: 25px auto; */
  /* background: #fff; */
  border-radius: 4px;
  /* gap: 0 10%; */
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor2};
`;

const OneArea = styled.div`
  width: 33.3%;
  height: 100%;
  /* border: 1px solid red; */
`;

const TwoArea = styled.div`
  width: 33.3%;
  height: 100%;
  ${({ theme }) => theme.BoxCenter};
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
  border: 1px solid ${({ theme }) => theme.bgColor2};
  /* color: ${({ theme }) => theme.colors.white}; */
  font-weight: 600;
`;

const TypingArea = styled.div`
  width: 100%;
  height: 30%;
  ${({ theme }) => theme.BoxCenter};
  border: 1px solid ${({ theme }) => theme.bgColor2};
  /* color: ${({ theme }) => theme.colors.white}; */
  font-weight: 600;
  /* background-color: ${({ theme }) => theme.bgColor}; */
  /* c */
`;
