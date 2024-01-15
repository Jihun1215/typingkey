import styled from "styled-components";

import { useRecoilValue } from "recoil";
import {
  TypingCountState,
  TypingTimeState,
  TypingAccuracyArrState,
  TypingCpmState,
} from "state/atoms";

import { Percent } from "./Percent";
import { Tooltip } from "./Tooltip";

export const TypingInfo = () => {
  const typingCount = useRecoilValue(TypingCountState);
  const time = useRecoilValue(TypingTimeState);
  const accuracyArr = useRecoilValue(TypingAccuracyArrState);

  const currentCpm = useRecoilValue(TypingCpmState);
  // console.log(currentCpm);

  const sum = accuracyArr.reduce((acc, currentValue) => acc + currentValue, 0);

  const average = accuracyArr.length
    ? Number(sum / accuracyArr.length).toFixed(0)
    : 0;

  // console.log(average);
  return (
    <Container>
      {/* 현재 진행하고 있는 문장에 대한 값들 */}
      <Tooltip message="분당 타자수" placement="typinginfo">
        <Item style={{ borderRight: "none" }}>
          CPM:
          {/* <Percent value={currentCpm} type="cpm" /> */}
          {/* {cpm === 0 ? <p>XX</p> : <p>{cpm}</p>} */}
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
          ACC
          <Percent value={Number(average)} type="average" />
        </Item>
      </Tooltip>

      <Tooltip message="진행도" placement="typinginfo">
        <Item>
          Progress
          <Percent value={0} type="progress" />
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
  height: 60px;
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
