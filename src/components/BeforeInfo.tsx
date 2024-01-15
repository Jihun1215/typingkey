import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  TypingAccuracyArrState,
  TypingCpmArrState,
} from "state/atoms";

export const BeforeInfo = () => {
  const typingCount = useRecoilValue(TypingCountState);
  const accuracy = useRecoilValue(TypingAccuracyArrState);

  const cpmArr = useRecoilValue(TypingCpmArrState);

  const maxCpm = Math.max(...cpmArr);

  return (
    <Container>
      <Item>
        Acc:
        {accuracy.length === 0 ? (
          <p> XX</p>
        ) : (
          <p>{accuracy[typingCount - 1]}%</p>
        )}
      </Item>
      <Item>
        CPM:
        {cpmArr?.length === 0 ? <p>XX</p> : <p> {cpmArr[typingCount - 1]}</p>}
      </Item>
      <Item>MAX: {cpmArr.length === 0 ? <p>XX</p> : <p>{maxCpm}</p>}</Item>
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
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.div`
  ${({ theme }) => theme.BoxCenter};
  gap: 0 3px;
  p {
    font-weight: 700;
  }
`;
