import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
//   TypingTimeState,
//   TypingProgressState,
  TypingAccuracyState,
} from "state/atoms";

// 타이핑 한 문장당 데이터를 가져와 기존 데이터와 비교하여 총 값을 나오게 하기
export const TotalInfo = () => {
  // 타이핑 된 문장 갯수를 카우팅 하는 State
  const typingCount = useRecoilValue(TypingCountState);
  // 최초 타이핑 후 지속된 시간 State
//   const time = useRecoilValue(TypingTimeState);

  //   const progress = useRecoilValue(TypingProgressState);

  const accuracy = useRecoilValue(TypingAccuracyState);

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
      <Item>CPM: XX</Item>
      <Item>time: XX</Item>
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
