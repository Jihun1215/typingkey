import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  TypingWrongCountState,
  TypingProgressState,
  TypingTimeState,
  // TypingAccuracyState,
  // TypingTimeArrState,
  ,
} from "state/atoms";

export const TypingInfo = () => {
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const typingCount = useRecoilValue(TypingCountState);
  // 타이핑 틀린 갯수 카운팅 하는 State
  const wrongCount = useRecoilValue(TypingWrongCountState);
  const time = useRecoilValue(TypingTimeState);
  // console.log(time);
  // const timeArr = useRecoilValue(TypingTimeArrState);
  // console.log(timeArr);

  const progress = useRecoilValue(TypingProgressState);


  // CPM을 저장하는 State
  // const cpm = useRecoilValue(TypingCpmState);
  // console.log(cpm);

  // const accuracy = useRecoilValue(TypingAccuracyState);
  // console.log(accuracy);

  return (
    <Container>
      {/* 현재 진행하고 있는 문장에 대한 값들 */}
      <Item>
        CPM:
        {/* {cpm === 0 ? <p>XX</p> : <p>{cpm}</p>} */}
      </Item>
      <Item>
        총 타이핑 시간:
        {time === 0 ? <p>XX</p> : <p>{time}s</p>}
      </Item>
      <Item>틀린 갯수: {wrongCount}</Item>
      <Item>진행도: {progress}</Item>
      <Item>남은 문장 {typingCount} / 10</Item>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  border-radius: 4px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor2};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Item = styled.div`
  ${({ theme }) => theme.BoxCenter};
`;
