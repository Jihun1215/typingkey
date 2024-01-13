import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  //   TypingTimeState,
  TypingTimeArrState,
  TypingAccuracyState,
  TypingCpmArrState,
} from "state/atoms";

// 타이핑 한 문장당 데이터를 가져와 기존 데이터와 비교하여 총 값을 나오게 하기
export const BeforeInfo = () => {
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const typingCount = useRecoilValue(TypingCountState);

  const timeArr = useRecoilValue(TypingTimeArrState);

  const accuracy = useRecoilValue(TypingAccuracyState);

  const cpmArr = useRecoilValue(TypingCpmArrState);
  console.log(cpmArr);

  // MAX 값 뽑아서 세팅하기

  //   const BeforeAcc = accuracy[typingCount];
  // console.log(accuracy);
  // console.log(typingCount);
  //   console.log(accuracy[typingCount]);
  //
  return (
    <Container>
      <Item>
        Acc:
        {accuracy?.length === 0 ? (
          <p>XX</p>
        ) : (
          <p> {accuracy[typingCount - 1]}%</p>
        )}
      </Item>
      <Item>
        CPM:
        {cpmArr?.length === 0 ? <p>XX</p> : <p> {cpmArr[typingCount - 1]}</p>}
      </Item>
      <Item>
        time:
        {accuracy?.length === 0 ? (
          <p>XX</p>
        ) : (
          <p> {timeArr[typingCount - 1]}s</p>
        )}
      </Item>
      <Item>MAX: XX</Item>
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Item = styled.div`
  ${({ theme }) => theme.BoxCenter};
`;
