import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  TypingTimeState,
  // TypingAccuracyState,
  // TypingAccuracyArrState,
  // TypingCpmState,
  TypingSpeedState,
  TypingProgressState,
} from "state/atoms";

import { Percent } from "./Percent";
import { Tooltip } from "./Tooltip";

export const TypingInfo = () => {
  const typingCount = useRecoilValue(TypingCountState);
  const time = useRecoilValue(TypingTimeState);
  const speed = useRecoilValue(TypingSpeedState);
  const progress = useRecoilValue(TypingProgressState);
  // const accuaracy = useRecoilValue(TypingAccuracyState);
  // console.log(accuaracy);

  return (
    <Container>
      {/* 현재 진행하고 있는 문장에 대한 값들 */}
      <Tooltip message="타자속도" placement="typinginfo">
        <Item style={{ borderRight: "none" }}>
          Speed:
          <Percent value={speed} type="speed" />
        </Item>
      </Tooltip>

      <Tooltip message="타이핑 시간" placement="typinginfo">
        <Item>
          Time
          {time === 0 ? (
            <Percent value={0} type="time" />
          ) : (
            <Percent value={time} type="time" />
          )}
        </Item>
      </Tooltip>

      <Tooltip message="정확도" placement="typinginfo">
        <Item>
          여기에 뭐를 넣어야 할까..
          {/* <Percent value={accuaracy} type="accuaracy" /> */}
        </Item>
      </Tooltip>

      <Tooltip message="진행도" placement="typinginfo">
        <Item>
          Progress
          <Percent value={progress} type="progress" />
        </Item>
      </Tooltip>

      <Tooltip message="문장 수" placement="typinginfo">
        <Item>
          Count
          <Percent value={typingCount} type="count" />
          {/* <p>{typingCount}/ 10</p> */}
        </Item>
      </Tooltip>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.FlexRow};
  ${({ theme }) => theme.FlexCenter};
  border-radius: 4px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor2};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Item = styled.div`
  ${({ theme }) => theme.WH100};
  ${({ theme }) => theme.FlexCol};
  ${({ theme }) => theme.FlexCenter};
  gap: 10px 0;
  p {
    width: 80px;
    height: 20px;
    color: ${({ theme }) => theme.colors.greey};
    ${({ theme }) => theme.BoxCenter};
    border-radius: 4px;
  }
`;
