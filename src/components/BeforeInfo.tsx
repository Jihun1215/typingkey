import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  TypingAccuracyArrState,
  TypingCpmArrState,
  ModeToggleState,
} from "state/atoms";

export const BeforeInfo = () => {
  const mode = useRecoilValue(ModeToggleState);
  const typingCount = useRecoilValue(TypingCountState);
  const accuracy = useRecoilValue(TypingAccuracyArrState);

  const cpmArr = useRecoilValue(TypingCpmArrState);

  const maxCpm = Math.max(...cpmArr);

  return (
    <Container mode={mode.toString()}>
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

const Container = styled.div<{ mode: string }>`
  width: 40%;
  height: 30px;
  background-color: ${(props) =>
    props.mode === "true" ? "#4D4D4D" : "#adb5bd"};
  /* background-color: ${({ theme }) => theme.colors.gray3}; */
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
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
